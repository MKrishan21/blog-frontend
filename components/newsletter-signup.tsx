"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
})

export default function NewsletterSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      form.reset()
      toast.success("Thanks for subscribing to our newsletter!")
    }, 1000)
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm p-8 md:p-12">
      <div className="flex flex-col items-center text-center space-y-3 mb-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 dark:bg-sky-900">
          <Mail className="h-6 w-6 text-sky-600 dark:text-sky-300" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">Stay Updated</h2>
        <p className="text-muted-foreground max-w-md">
          Subscribe to our newsletter to receive the latest articles, news, and updates directly in your inbox.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="bg-sky-500 hover:bg-sky-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </Form>
    </div>
  )
}