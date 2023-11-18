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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  can_share: true,
};

export default function Page() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    const res = fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log((await res).status);
    // if () {
    //   toast.success('Template created!');
    // }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-10 space-y-8'>
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
        {/* <FormField
          control={form.control}
          name='can_share'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Would you allow us to proudly share the title of this e-mail on
                our public showcase page?
              </FormLabel>
              <Select defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an option' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Yes'>Yes</SelectItem>
                  <SelectItem value='No'>No</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        /> */}
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

        <Button type='submit'>Create template</Button>
      </form>
    </Form>
  );
}
