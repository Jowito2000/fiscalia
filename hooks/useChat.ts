import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Attachment, AttachmentSchema, FileType, FileTypes, Message } from '@/model/MessageModel';
import { firstChatMessage } from '@/data/firstChatMessage';
import { auth, db } from '@/firebase/firebaseClient';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    firstChatMessage
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const messagesRef = collection(db, "users", user.uid, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {

      if (snapshot.empty) {
        await addDoc(messagesRef, {
          role: firstChatMessage.role,
          content: firstChatMessage.content,
          timestamp: serverTimestamp(),
          userId: user.uid,
        });
        return;
      }
      const msgs = snapshot.docs
      .map((doc) => {
        const data = doc.data({ serverTimestamps: "estimate" });

        if (!data.timestamp) return null;

        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate?.() ?? new Date(),
        } as Message;
      })
      .filter((msg): msg is Message => msg !== null);

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid]);

  // ----------- Enviar mensaje de texto ----------
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const user = auth.currentUser;
    if (!user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    setIsLoading(true);

    try {
      const messagesRef = collection(db, "users", user.uid, "messages");

      await addDoc(messagesRef, {
        role: "user",
        content: input,
        timestamp: serverTimestamp(),
        clientTimestamp: new Date(),
        userId: user.uid,
      });

      setInput("");

    } catch (error) {
      console.error(error);
      toast.error("Error enviando mensaje");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------- Subida de archivo ----------
  const uploadFile = async (file: File) => {
    const fileType: FileType =
      file.type.includes("pdf")
        ? "PDF"
        : file.type.includes("image")
        ? "Imagen"
        : "Documento";

    toast.success(`${fileType} "${file.name}" cargado. Procesando...`);

    const user = auth.currentUser;
    if (!user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    const attachment: Attachment = {
      type: fileType,
      name: file.name,
    };

    try {
      const messagesRef = collection(db, "users", user.uid, "messages");

      // 1. Guardar mensaje del usuario
      await addDoc(messagesRef, {
        role: "user",
        content: `He adjuntado un archivo: ${file.name}`,
        timestamp: serverTimestamp(),
        userId: user.uid,
        attachments: [attachment],
      });

      // 2. Mensaje del asistente automático
      await addDoc(messagesRef, {
        role: "assistant",
        content: `He recibido tu ${fileType.toLowerCase()}. ¿Qué información necesitas extraer?`,
        timestamp: serverTimestamp(),
      });

    } catch (error) {
      console.error(error);
      toast.error("Error subiendo archivo");
    }
  };

  // ----------- Grabación de voz ----------
  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
    toast.info(
      isRecording ? "Grabación detenida" : "Grabación iniciada"
    );
  };

  return {
    messages,
    input,
    isLoading,
    isRecording,
    setInput,
    sendMessage,
    uploadFile,
    toggleRecording,
  };
}
