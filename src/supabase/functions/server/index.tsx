import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Supabase clients
const getServiceClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
  );
};

const getAnonClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') || '',
    Deno.env.get('SUPABASE_ANON_KEY') || '',
  );
};

// Middleware to verify authentication
const requireAuth = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ error: 'Unauthorized: No token provided' }, 401);
  }

  const token = authHeader.split(' ')[1];
  const supabase = getAnonClient();
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    console.log('Authorization error:', error);
    return c.json({ error: 'Unauthorized: Invalid token' }, 401);
  }

  c.set('userId', user.id);
  c.set('user', user);
  await next();
};

// Health check endpoint
app.get("/make-server-ba59f8f5/health", (c) => {
  return c.json({ status: "ok" });
});

// AUTH ROUTES
app.post("/make-server-ba59f8f5/auth/register", async (c) => {
  try {
    const body = await c.req.json();
    const { name, lastName, email, password, userType } = body;

    if (!email || !password || !name || !lastName) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const supabase = getServiceClient();
    
    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, lastName, userType },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true,
    });

    if (error) {
      console.error('Registration error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user data in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      lastName,
      userType,
      createdAt: new Date().toISOString(),
    });

    // Sign in the user to get access token
    const anonClient = getAnonClient();
    const { data: sessionData, error: signInError } = await anonClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Sign in error after registration:', signInError);
      return c.json({ error: 'User created but sign in failed' }, 500);
    }

    return c.json({
      user: {
        id: data.user.id,
        email,
        name,
        lastName,
        userType,
        accessToken: sessionData.session.access_token,
      },
    });
  } catch (error) {
    console.error('Error in registration:', error);
    return c.json({ error: 'Internal server error during registration' }, 500);
  }
});

app.post("/make-server-ba59f8f5/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const supabase = getAnonClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Get user data from KV store
    const userData = await kv.get(`user:${data.user.id}`);

    return c.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        name: userData?.name || '',
        lastName: userData?.lastName || '',
        userType: userData?.userType || 'particular',
        accessToken: data.session.access_token,
      },
    });
  } catch (error) {
    console.error('Error in login:', error);
    return c.json({ error: 'Internal server error during login' }, 500);
  }
});

// CHAT ROUTES
app.post("/make-server-ba59f8f5/chat", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { message, chatHistory } = body;

    if (!message) {
      return c.json({ error: 'Message is required' }, 400);
    }

    // Store chat message
    const chatId = `chat:${userId}:${Date.now()}`;
    await kv.set(chatId, {
      userId,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simple AI response (in production, this would call an LLM API)
    let response = '';
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('irpf')) {
      response = 'El IRPF (Impuesto sobre la Renta de las Personas Físicas) es un impuesto directo y progresivo que grava la renta obtenida en un año natural por las personas físicas residentes en España. Para autónomos, normalmente se aplica una retención del 15% (7% el primer año de alta). ¿Necesitas ayuda con algún cálculo específico?';
    } else if (lowerMessage.includes('iva')) {
      response = 'El IVA (Impuesto sobre el Valor Añadido) es un impuesto indirecto que grava el consumo. En España existen tres tipos: General (21%), Reducido (10%) y Superreducido (4%). Los autónomos deben presentar el modelo 303 trimestralmente para declarar el IVA. ¿Quieres que te ayude a rellenar el modelo 303?';
    } else if (lowerMessage.includes('303')) {
      response = 'El Modelo 303 es la declaración trimestral de IVA. Debes presentarlo antes del día 20 del mes siguiente al final del trimestre. En este modelo declaras el IVA repercutido (cobrado) y el IVA soportado (pagado). Puedo ayudarte a completarlo en la sección de Modelos Fiscales. ¿Quieres ir allí?';
    } else if (lowerMessage.includes('130')) {
      response = 'El Modelo 130 es el pago fraccionado del IRPF para autónomos en estimación directa. Se presenta trimestralmente (días 1-20 de abril, julio, octubre y enero). Declaras tus ingresos menos gastos, y pagas el 20% del rendimiento neto. Puedo guiarte paso a paso en la sección de Modelos Fiscales.';
    } else if (lowerMessage.includes('factura')) {
      response = 'Para crear una factura como autónomo, necesitas incluir: tus datos fiscales (nombre, NIF, dirección), datos del cliente, número de factura, fecha, concepto, base imponible, IVA (normalmente 21%) y retención de IRPF si aplica. Puedo ayudarte a generar una factura automáticamente en la sección de Facturas. ¿Quieres probar?';
    } else if (lowerMessage.includes('autónomo') || lowerMessage.includes('autonomo')) {
      response = 'Un autónomo o trabajador por cuenta propia es una persona física que realiza una actividad económica de forma habitual, personal y directa. Debe estar dado de alta en el RETA (Régimen Especial de Trabajadores Autónomos) y pagar una cuota mensual. También debe declarar trimestralmente el IVA (modelo 303) y el IRPF (modelo 130). ¿Necesitas ayuda con algún trámite específico?';
    } else if (lowerMessage.includes('hola') || lowerMessage.includes('ayuda')) {
      response = 'Hola! Estoy aquí para ayudarte con tus dudas sobre finanzas, impuestos y facturación. Puedo explicarte conceptos fiscales, ayudarte a rellenar modelos (303, 130), crear facturas, y responder preguntas sobre IVA, IRPF, y gestión financiera. ¿En qué puedo ayudarte?';
    } else {
      response = `Entiendo que tienes una consulta sobre "${message}". Como asistente fiscal, puedo ayudarte con información sobre IRPF, IVA, facturas, modelos 303 y 130, conceptos fiscales básicos, y gestión financiera para autónomos. ¿Podrías ser más específico sobre qué información necesitas? Por ejemplo: "¿Qué es el IRPF?", "¿Cómo relleno el modelo 303?", "¿Cómo crear una factura?"`;
    }

    return c.json({
      response,
      sources: ['Base de conocimientos Fiscal IA', 'Normativa fiscal española'],
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return c.json({ error: 'Error processing chat message' }, 500);
  }
});

// CLIENT ROUTES
app.get("/make-server-ba59f8f5/clients", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const clients = await kv.getByPrefix(`client:${userId}:`);
    
    return c.json({ clients: clients || [] });
  } catch (error) {
    console.error('Error loading clients:', error);
    return c.json({ error: 'Error loading clients' }, 500);
  }
});

app.post("/make-server-ba59f8f5/clients", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { name, nif, address } = body;

    if (!name || !nif) {
      return c.json({ error: 'Name and NIF are required' }, 400);
    }

    const clientId = `client:${userId}:${Date.now()}`;
    const client = {
      id: clientId,
      name,
      nif,
      address: address || '',
      createdAt: new Date().toISOString(),
    };

    await kv.set(clientId, client);

    return c.json({ client });
  } catch (error) {
    console.error('Error creating client:', error);
    return c.json({ error: 'Error creating client' }, 500);
  }
});

// INVOICE ROUTES
app.post("/make-server-ba59f8f5/invoices", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { clientId, concept, unitPrice, quantity, ivaPercentage, irpfPercentage, subtotal, iva, irpf, total, date } = body;

    const invoiceId = `invoice:${userId}:${Date.now()}`;
    const invoice = {
      id: invoiceId,
      userId,
      clientId,
      concept,
      unitPrice,
      quantity,
      ivaPercentage,
      irpfPercentage,
      subtotal,
      iva,
      irpf,
      total,
      date,
      createdAt: new Date().toISOString(),
    };

    await kv.set(invoiceId, invoice);

    // Create document entry
    const documentId = `document:${userId}:${Date.now()}`;
    await kv.set(documentId, {
      id: documentId,
      name: `Factura - ${concept}`,
      type: 'invoice',
      date: date,
      size: '45 KB',
      status: 'completed',
      invoiceId,
    });

    return c.json({ invoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return c.json({ error: 'Error creating invoice' }, 500);
  }
});

// DOCUMENT ROUTES
app.get("/make-server-ba59f8f5/documents", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const documents = await kv.getByPrefix(`document:${userId}:`);
    
    return c.json({ documents: documents || [] });
  } catch (error) {
    console.error('Error loading documents:', error);
    return c.json({ error: 'Error loading documents' }, 500);
  }
});

app.delete("/make-server-ba59f8f5/documents/:id", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const documentId = c.req.param('id');

    // Verify document belongs to user
    if (!documentId.startsWith(`document:${userId}:`)) {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    await kv.del(documentId);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting document:', error);
    return c.json({ error: 'Error deleting document' }, 500);
  }
});

// USER PROFILE ROUTES
app.put("/make-server-ba59f8f5/user/profile", requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();

    // Get existing user data
    const existingData = await kv.get(`user:${userId}`) || {};

    // Update user data
    const updatedUser = {
      ...existingData,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`user:${userId}`, updatedUser);

    return c.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    return c.json({ error: 'Error updating profile' }, 500);
  }
});

Deno.serve(app.fetch);