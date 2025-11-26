import { Button } from "../ui/button";

export function OtherModelCard({ model, description, button_text = "Próximamente" }: { model: string; description: string; button_text?: string }) {
    return (
        <div className="p-4 border rounded-lg">
            <h4>Modelo {model}</h4>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
            <Button variant="outline" className="mt-3" disabled>
                {button_text}
            </Button>
        </div>
    )
}