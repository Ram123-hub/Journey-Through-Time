"use client";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";


// Schema Validation using Zod
const FormSchema = z.object({
    name: z.string().min(1, { message: "name is required." }),
    year: z.string().min(1, { message: "year is required." }),
    biography: z.string().min(1, { message: "biography is required." }),
    image_url: z.string().optional(),
    public_id: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function FamousFigureForm() {
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const form = useForm<FormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            year: "",
            biography: "",
        },
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
        setError(null);
        try {
            if (!image) {
                setError("Image is required.");
                return;
            }

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("year", data.year);
            formData.append("biography", data.biography);
            formData.append("image", image);

            const response = await axios.post("/api/users/figure", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if(response)
            {
                router.push('/figures')
            }

            console.log(await response.data);
        } catch (error: any) {
            console.error("Error submitting form:", error.message);
            setError(
                error.response?.data?.msg ||
                "An unexpected error occurred while submitting the form."
            );
        }
    };

    return (
        <main className="bg-richblack min-h-screen py-10">
            <div className="flex justify-center items-center min-h-screen px-4 md:px-0">
                <Card className="w-full max-w-md md:max-w-lg bg-smokyBlack mx-auto p-6 rounded-lg shadow-lg border-bistre">
                    <CardHeader className="text-rawnumber2 font-bold">
                        <CardTitle className="flex items-center justify-center text-2xl md:text-3xl font-bold">
                            Famous Figure
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmitHandler)}
                                className="w-full space-y-6"
                            >
                                <div className="grid w-full items-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <div className="flex flex-col space-y-1.5">
                                                <Label
                                                    htmlFor="name"
                                                    className="text-rawNumber font-bold"
                                                >
                                                    Name of Famous Figure
                                                </Label>
                                                <Input
                                                    id="name"
                                                    placeholder="Name of famous figure"
                                                    {...field}
                                                    className="text-seashell border-bistre hover:border-rawnumber2"
                                                />
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="year" className="text-rawNumber font-bold">
                                                    Year
                                                </Label>
                                                <Input
                                                    id="year"
                                                    placeholder="Born in year"
                                                    {...field}
                                                    className="text-seashell border-bistre hover:border-rawnumber2"
                                                />
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="biography"
                                        render={({ field }) => (
                                            <div className="flex flex-col space-y-1.5">
                                                <Label
                                                    htmlFor="biography"
                                                    className="text-rawNumber font-bold"
                                                >
                                                    Biography
                                                </Label>
                                                <Textarea
                                                    id="biography"
                                                    placeholder="Description of famous figure"
                                                    {...field}
                                                    className="text-seashell border-bistre hover:border-rawnumber2"
                                                />
                                                <FormMessage />
                                            </div>
                                        )}
                                    />
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="image" className="text-rawNumber font-bold">
                                            Upload Image
                                        </Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={onChangeHandler}
                                            className="text-seashell border-bistre hover:border-rawnumber2 hover:bg-bistre"
                                        />
                                    </div>
                                </div>
                                <CardFooter className="flex justify-center">
                                    <Button
                                        type="submit"
                                        className="w-full md:w-32 bg-bistre text-seashell hover:bg-rawnumber2"
                                    >
                                        Submit
                                    </Button>
                                </CardFooter>
                                {error && (
                                    <div className="text-red-500 text-center mt-4">{error}</div>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                
            </div>
        </main>
    );
}
