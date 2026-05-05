import { SignIn } from "@clerk/nextjs";

export default function Page() {
  
    return (
        <div className="flex justify-center items-center h-full bg-transparent  p-6 ">

            <SignIn
                appearance={{
                    variables: {
                        colorBackground: "#0a1223",
                        colorPrimary: "#3b82f6",
                        colorText: "#e2e8f0",
                        colorTextSecondary: "#94a3b8",
                        colorTextOnPrimaryBackground: "#ffffff",
                        colorInputBackground: "#0f172a",
                        colorInputText: "#f1f5f9",
                        colorNeutral: "#94a3b8",
                        colorDanger: "#f87171",
                        borderRadius: "10px",
                        fontSize: "15px",
                    },
                    elements: {
                        card: {
                            background: "rgba(10,18,35,0.92)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            borderRadius: "20px",
                        },
                        headerTitle: { color: "#f8fafc" },
                        headerSubtitle: { color: "#94a3b8" },
                        socialButtonsBlockButton: {
                            background: "rgba(15,23,42,0.9)",
                            border: "1px solid rgba(71,85,105,0.6)",
                            color: "#e2e8f0",
                        },
                        socialButtonsBlockButtonText: { color: "#e2e8f0" },
                        dividerText: { color: "#64748b" },
                        formFieldLabel: { color: "#cbd5e1" },
                        formFieldInput: {
                            background: "#0f172a",
                            border: "1px solid rgba(71,85,105,0.7)",
                            color: "#f1f5f9",
                        },
                        formButtonPrimary: {
                            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                            color: "#ffffff",
                        },
                        footerActionText: { color: "#94a3b8" },
                        footerActionLink: { color: "#60a5fa" },
                    },
                }}
            />


        </div>
    );
}