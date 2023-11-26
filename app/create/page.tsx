'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

import { useState } from 'react';

import { redirect } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

const profileFormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(320, {
      message: 'Username must not be longer than 320 characters.',
    })
    .email(),
  title: z.string({
    required_error: 'Please provide a title for your e-mail.',
  }),
  content: z.string().max(10000).min(4),
  can_share: z.boolean(),
  user_id: z.string().nullable(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type Id = { id: number };

async function fetchUser() {
  const res = await axios.get('/api/get-user');
  console.log('id:', res.data.data);
  // 🎉 parse against the schema
  return profileFormSchema.parse({ id: res.data.data });
}

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  can_share: true,
};

export default function Page() {
  // TODO: redirect if no user detected

  // console.log(user);
  // if (!user) {
  //   redirect('/login');
  // }

  const [url, setUrl] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    console.log(JSON.stringify(data));
    const res = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(async (res) => {
      const json = await res.json();
      if (json.status === 201) {
        toast.success('Template created!');
        console.log(json);
        setUrl(json.data);
      }
    });
  }
  //TODO: hardcoded website url
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://rallymail.vercel.app/template/${url}`
    );
    toast.success('Copied to clipboard.');
  };

  const { data } = useQuery({
    queryKey: ['initial-users'],
    queryFn: () => fetchUser(),
    initialData: defaultValues,
  });

  if (data) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='my-10 space-y-8'
        >
          <FormField
            name='user_id'
            control={form.control}
            render={({ field }) => (
              <input type='hidden' {...field} value={data.user_id as any} />
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver&apos;s e-mail</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  The e-mail address that this template will be addressed to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title of e-mail</FormLabel>
                <FormControl>
                  <Input placeholder='Title' {...field} />
                </FormControl>
                <FormDescription>The title of the e-mail.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='The content of the template'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  NOTE: You currently cannot come back to edit this form once
                  submitted. If you mess up, you can simply make a new one.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            className='disabled:opacity-80'
            type='submit'
          >
            Create template
          </Button>
        </form>
        {url ? (
          <>
            <Button onClick={handleCopy}>Copy to clipboard</Button>
            <a target='_blank' href={`/template/${url}`}>
              View your form here &rarr;
            </a>
          </>
        ) : null}
      </Form>
    );
  }
  return <h1>We could not read your user id.</h1>;
}
