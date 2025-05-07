'use client'
import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  const [submitted, setSubmitted] = useState<any>(null);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted(data);
  };
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">

      <Form className="w-full max-w-xs" onSubmit={onSubmit}>
        <Input
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          id="email"
          name="email"
          placeholder="Enter your email"
          type="text"
        />

<Input
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          id="email"
          name="email"
          placeholder="Enter your email"
          type="text"
        />

<Input
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          id="email"
          name="email"
          placeholder="Enter your email"
          type="text"
        />

        <Button type="submit" variant="bordered">
          Submit
        </Button>
        {submitted && (
          <div className="text-small text-default-500">
            You submitted: <code>{JSON.stringify(submitted)}</code>
          </div>
        )}
      </Form>
    </section>
  );
}
