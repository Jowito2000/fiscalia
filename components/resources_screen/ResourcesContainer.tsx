import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";

interface ResourcesProps {
    title: string;
    description: string;
    link: string;
    buttonText: string;
    lastUpdate: string;
}

export function ResourcesContainer({title, description, link, buttonText, lastUpdate}: ResourcesProps) {
    return (
        <Card className="hover:scale-105 transition-all active:scale-95 cursor-pointer" onClick={() => {window.open(link, "_blank")}}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-between grow">
                <div className="space-y-4 mt-auto">
                    <Button className="w-full hover:scale-105 transition-all active:scale-95 cursor-pointer">
                        <FileText className="w-4 h-4 mr-2" />
                        {buttonText}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        Última actualización: {lastUpdate}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
