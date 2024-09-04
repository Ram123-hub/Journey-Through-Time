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
  invention: z.string().min(1, { message: "Invention is required." }),
  inventor: z.string().min(1, { message: "Inventor is required." }),
  year: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Year must be greater than 0." })
  ),
  description: z.string().min(1, { message: "Description is required." }),
  imageUrl: z.string().optional(),
  public_id: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function InventionForm() {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invention: "",
      inventor: "",
      year: 2004,
      description: "",
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
      formData.append("invention", data.invention);
      formData.append("inventor", data.inventor);
      formData.append("year", data.year.toString());
      formData.append("description", data.description);
      formData.append("image", image);

      const response = await axios.post("/api/users/inventions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response)
      {
    
      }
      console.log(response.data);
      console.log(response)
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
      <div className="flex justify-center items-center min-h-screen px-4">
        <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-smokyBlack mx-auto p-6 rounded-lg shadow-lg border-bistre">
          <CardHeader className="text-rawnumber2 font-bold">
            <CardTitle className="flex items-center justify-center text-2xl md:text-3xl font-bold">
              Add Invention
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
                    name="invention"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="invention"
                          className="text-rawNumber font-bold"
                        >
                          Invention
                        </Label>
                        <Input
                          id="invention"
                          placeholder="e.g. bulb"
                          {...field}
                          className="text-seashell border-bistre hover:border-rawnumber2"
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="inventor"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-1.5">
                        <Label
                          htmlFor="inventor"
                          className="text-rawNumber font-bold"
                        >
                          Inventor
                        </Label>
                        <Input
                          id="inventor"
                          placeholder="e.g. Thomas Edison"
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
                          placeholder="e.g. 1879"
                          {...field}
                          className="text-seashell border-bistre hover:border-rawnumber2"
                        />
                        <FormMessage />
                      </div>
                    )}
                  />
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
                          placeholder="Describe the invention"
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
