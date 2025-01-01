"use client";

import React, { useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { createStartupPitch } from "@/lib/actions";
import { useRouter } from "next/navigation";
export default function StartupSubmitForm() {
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [value, setValue] = React.useState<string>(" "); // For MDEditor
    const { toast } = useToast();
    const router = useRouter();
    const handleSubmit = async (prev: any, formData: FormData) => {
        try {
            const data = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                image: formData.get("image") as string,
                pitch: value || "", // Ensure value is not null
            };

            // Validate the form data using Zod schema
            await formSchema.parseAsync(data);

              console.log(data);
            const formDataToSend = new FormData();
            formDataToSend.append("title", data.title);
            formDataToSend.append("description", data.description);
            formDataToSend.append("category", data.category);
            formDataToSend.append("image", data.image);
            formDataToSend.append("pitch", data.pitch);
            console.log(formDataToSend);
            const result = await createStartupPitch(prev, formDataToSend, value);
            if(result.status=="SUCCESS"){
                toast({
                    title: "Startup Submitted",
                    description: "Your startup has been submitted successfully",
                })
                router.push(`/startup/${result._id}`);
            }
            toast({
                title: "Startup Submitted",
                description: "Your startup has been submitted successfully",
            });

            // Example redirection or success action
            // router.push(`/startup/${result.id}`);

            return { ...prev, error: "", status: "SUCCESS" };
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                const formattedErrors: Record<string, string> = {};
                for (const key in fieldErrors) {
                    if (fieldErrors[key]) {
                        formattedErrors[key] = fieldErrors[key]!.join(", ");
                    }
                }
                setErrors(formattedErrors);
                toast({
                    title: "Validation Error",
                    description: "Please check the form for errors.",
                    variant: "destructive",
                });
                return { ...prev, error: "validation error", status: "ERROR" };
            }
            console.error(error);
            toast({
                title: "Unknown Error",
                description: "An unknown error occurred.",
                variant: "destructive",
            });
            return { ...prev, error: "unknown error", status: "ERROR" };
        }
    };

    const [state, formAction, isPending] = useActionState(handleSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">
                    Title of your startup
                </label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter the title of your startup"
                    required
                    className="startup-form_input"
                />
                {errors?.title && <p className="startup-form_error">{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">
                    Description
                </label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter the description of your startup"
                    required
                    className="startup-form_input"
                />
                {errors?.description && (
                    <p className="startup-form_error">{errors.description}</p>
                )}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">
                    Category
                </label>
                <Input
                    id="category"
                    name="category"
                    type="text"
                    placeholder="Enter the category of your startup"
                    required
                    className="startup-form_input"
                />
                {errors?.category && (
                    <p className="startup-form_error">{errors.category}</p>
                )}
            </div>
            <div>
                <label htmlFor="image" className="startup-form_label">
                    Image
                </label>
                <Input
                    id="image"
                    name="image"
                    type="url"
                    required
                    className="startup-form_input"
                    placeholder="Enter Your Startup Image URL"
                />
                {errors?.image && <p className="startup-form_error">{errors.image}</p>}
            </div>
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">
                    Pitch
                </label>
                <MDEditor
                    value={value || ""}
                    onChange={(val) => setValue(val as string)}
                    preview="edit"
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Briefly describe your startup",
                    }}
                />
                {errors?.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>
            <Button
                type="submit"
                className="text-white startup-form_btn"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit"}
                <Send size={24} />
            </Button>
        </form>
    );
}
