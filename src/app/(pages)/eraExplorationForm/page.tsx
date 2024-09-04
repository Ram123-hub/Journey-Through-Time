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
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  link: z.string().url({ message: "Invalid URL format." }).optional(),
  image_url: z.string().optional(),
  public_id: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function EraExolorationForm() {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router  = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      link: "",
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
      formData.append("description", data.description);

      if (data.link) {
        formData.append("link", data.link as string);
      }

      formData.append("image", image);

      const response = await axios.post("/api/users/eraExploration", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if(response)
      {
      router.push("/eraExploration")
      }

      console.log(await response.data);
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred while submitting the form."
      );
    }
  };

  return (
    <main className="bg-richblack min-h-screen py-10">
      <div className="flex justify-center items-center min-h-screen px-4 md:px-0">
        <Card className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-smokyBlack mx-auto p-6 rounded-lg shadow-lg border-bistre">
          <CardHeader className="text-rawnumber2 font-bold">
            <CardTitle className="flex items-center justify-center text-2xl md:text-3xl font-bold">
              Add Era
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="w-full space-y-6"
              >
                <div className="grid w-full gap-4 md:gap-6">
                  {/* Title Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="text-rawNumber font-bold"
                        >
                          Name of Era
                        </Label>
                        <Input
                          id="name"
                          placeholder="e.g. Post independence era"
                          {...field}
                          className="text-seashell border-bistre hover:border-rawnumber2"
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* Description Field */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="description"
                          className="text-rawNumber font-bold"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="The era of India before 1947"
                          {...field}
                          className="text-seashell border-bistre hover:border-rawnumber2"
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* Link Field */}
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="link"
                          className="text-rawNumber font-bold"
                        >
                          Link
                        </Label>
                        <Input
                          id="link"
                          placeholder="https://example.com"
                          {...field}
                          className="text-seashell border-bistre hover:border-rawnumber2"
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  {/* Image Upload Section */}
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
                    className="w-32 bg-bistre text-seashell hover:bg-rawnumber2"
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
