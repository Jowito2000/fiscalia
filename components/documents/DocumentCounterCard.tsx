import { Card, CardContent } from "@/components/ui/card";

export function DocumentCounterCard({ documentType, documentCount, icon }: { documentType: string, documentCount: number, icon: React.ReactNode }) {
    return (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{documentType}</p>
                <p className="text-2xl">{documentCount}</p>
              </div>
              {icon}
            </div>
          </CardContent>
        </Card>
    )
}   