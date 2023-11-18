'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Email address must be at least 2 characters.',
  }),
});

export default function Index() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    router.push(`/create?email=${values.email}`);
  }

  return (
    <div className='container px-6 py-12 mx-auto'>
      <div className='flex flex-wrap items-center'>
        <div className='w-full md:w-1/2'>
          <h1 className='mt-0 mb-6 font-bold text-7xl'>
            Amplify Your Voice, Unite for Change
          </h1>
          <h3 className='mb-8 text-3xl'>
            Make action easier and encourage people to speak up with
            click-to-send e-mail campaigns — multiply your message&apos;s reach
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='inline-flex flex-row w-4/5 mb-8 space-x-2 justify-content'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='flex-col w-full'>
                    <FormControl>
                      <Input
                        className='px-3 py-2 border rounded shadow text-grey-darker'
                        placeholder="Enter the receiver's address"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className='px-4 py-2 font-bold text-center text-white rounded w-fit bg-neutral-500 hover:bg-neutral-700'
                type='submit'
              >
                Create
              </Button>
            </form>
          </Form>

          <div className='flex mb-8'>
            <div className='flex items-center mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='40'
                height='40'
                viewBox='0 0 50 50'
              >
                <path d='M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z'></path>
              </svg>
              <span className='text-sm'>Absolutely free.</span>
            </div>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='40'
                height='40'
                viewBox='0 0 50 50'
              >
                <path d='M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z'></path>
              </svg>
              <span className='text-sm'>100% privacy.</span>
            </div>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='40'
                height='40'
                viewBox='0 0 50 50'
              >
                <path d='M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z'></path>
              </svg>
              <span className='text-sm'>Make it heard.</span>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/2'>
          <div className='h-64 bg-gray-300'></div>
        </div>
      </div>
    </div>
  );
}
