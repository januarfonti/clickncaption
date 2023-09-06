"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import Image from "next/image"
import { UnsplashImageResponse } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useCompletion } from "ai/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { AspectRatio } from "@/components/ui/aspect-ratio"
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
import { toast } from "@/components/ui/use-toast"

interface UnsplashSearchFormData {
  unsplash_image_query: string
}

const FormSchema = z.object({
  keyword: z.string().nonempty(),
})

function UnsplashForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { keyword } = data
    let response = await fetch(`/api/unsplash?query=${keyword}`)

    const images = await response.json()

    if (images.error) {
      // toast.error(images.message)
      return
    }
    setUnsplashImages(images)
  }

  let [unsplashImages, setUnsplashImages] = useState<UnsplashImageResponse[]>(
    []
  )

  const getUnsplashImages = async (query: string) => {
    let response = await fetch(`/api/unsplash?query=${query}`)

    const images = await response.json()

    if (images.error) {
      // toast.error(images.message)
      return
    }
    setUnsplashImages(images)
  }

  function handleUnsplashSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const data: UnsplashSearchFormData = {
      unsplash_image_query: "",
    }

    formData.forEach(
      (value, key) =>
        (data[key as keyof UnsplashSearchFormData] = value as string)
    )

    const { unsplash_image_query } = data

    getUnsplashImages(unsplash_image_query)
  }

  return (
    <div className="flex w-full flex-col space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <Card>
            <CardContent className="p-6">
              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keyword</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter keywords for the image you want to search for.
                      Example: &quot;A cup of coffee&quot;
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Find Images
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {unsplashImages.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {unsplashImages.map((image) => (
                <div key={image.id}>
                  <AspectRatio ratio={4 / 5}>
                    <Image
                      src={image.urls.regular}
                      alt={image.alt_description}
                      className="rounded object-cover"
                      fill
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default UnsplashForm
