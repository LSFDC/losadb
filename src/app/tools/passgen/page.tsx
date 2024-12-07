import { DecryptPassForm, EncryptPassForm } from "@/components/tools/passgen-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PassgenPage() {
    return (
        <div className="space-y-5">
            <h1 className="text-lg font-bold">IOP Password Generator</h1>
            <Separator />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Encryptor */}
                <Card>
                    <CardHeader>
                        <CardTitle>Encryption</CardTitle>
                        <CardDescription>Encrypting IOP Password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <EncryptPassForm />
                    </CardContent>
                </Card>

                {/* Decryptor */}
                <Card>
                    <CardHeader>
                        <CardTitle>Decryption</CardTitle>
                        <CardDescription>Decrypting encrypted IOP Password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DecryptPassForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}