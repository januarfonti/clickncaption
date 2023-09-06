"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  input_language: z.string({
    required_error: "Please select a language",
  }),
  output_language: z.string({
    required_error: "Please select a language",
  }),
  description: z.string().min(3).max(255),
  customizable_outputs: z.boolean(),
  number_of_words: z
    .number()
    .positive({ message: "Value must be positive" })
    .int({ message: "Value must be an integer" })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .min(3, { message: "Value must be greater than 3" })
        .max(30, { message: "Value must be less than 30" })
        .positive({ message: "Value must be positive" })
        .int({ message: "Value must be an integer" })
    ),
  generate_hashtags: z.boolean(),
  number_of_hashtags: z
    .number()
    .positive({ message: "Value must be positive" })
    .int({ message: "Value must be an integer" })
    .or(z.string())
    .pipe(
      z.coerce
        .number()
        .min(1, { message: "Value must be greater than 0" })
        .max(30, { message: "Value must be less than 30" })
        .positive({ message: "Value must be positive" })
        .int({ message: "Value must be an integer" })
    ),
})

export function CaptionGeneratorForm() {
  const [isCopied, setIsCopied] = useState(false)

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/caption/generate",
    onResponse: (res) => {
      if (res.status === 429) {
        toast({
          description: "You have exceeded the rate limit. Please try again.",
        })
      }
    },
    onFinish: () => {
      toast({
        description: "Caption generated successfully!",
      })
    },
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      input_language: "en",
      output_language: "en",
      customizable_outputs: false,
      number_of_words: 3,
      generate_hashtags: false,
      number_of_hashtags: 1,
    },
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(completion)
    setIsCopied(true)
    toast({
      description: "Copied to clipboard!",
    })
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const hashtagsData = `and generate ${data.number_of_hashtags} hashtags.`
    const totalSenctenceData = `and generate only ${data.number_of_words} words.`

    const prompt = `${data.description}. Input Language: ${
      data.input_language
    }. Output Language: ${data.output_language} ${
      data.customizable_outputs ? totalSenctenceData : ""
    } ${data.generate_hashtags ? hashtagsData : "without hashtags."}`
    complete(JSON.stringify(prompt))
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 space-x-4">
                  <FormField
                    control={form.control}
                    name="input_language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Input Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en" defaultValue="id">
                              English
                            </SelectItem>
                            <SelectItem value="id">Indonesia</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The language of your image description.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="output_language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Output Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en" defaultValue="id">
                              English
                            </SelectItem>
                            <SelectItem value="id">Indonesia</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The language of your generated caption.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your image. For ex: A cup of coffee on a table."
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customizable_outputs"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Customizable Outputs</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("customizable_outputs") && (
                  <FormField
                    control={form.control}
                    name="number_of_words"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Words</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="generate_hashtags"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Generate Hashtags</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("generate_hashtags") && (
                  <FormField
                    control={form.control}
                    name="number_of_hashtags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Hashtags</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Generate Caption
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Generated Caption</CardTitle>
              <CardDescription>
                This is the generated caption for your image.
              </CardDescription>
            </div>
            <Button onClick={handleCopy} disabled={!completion}>
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p>{completion}</p>
        </CardContent>
      </Card>
    </div>
  )
}
