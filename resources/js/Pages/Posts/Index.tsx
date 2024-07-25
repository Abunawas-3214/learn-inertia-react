import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { PageProps, Post } from '@/types';
import { useEffect } from 'react';

interface postProps extends PageProps {
    posts: {
        data: Post[]
    }
}


export default function Index({ auth, posts }: postProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm("StorePost", {
            body: "",
        });

    const page = usePage<PageProps>();

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('posts.store'), {
            onSuccess: () => {
                reset('body')
            }
        });
    }

    function refreshPost() {
        router.visit(route('posts.index'), {
            only: ['posts'],
            preserveScroll: true,
        })
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Posts</h2>}
        >
            <Head title="Posts">
                <meta name='description' content='Post Index' />
            </Head>

            <div className="py-12">
                <div className="max-w-3xl mx-auto space-y-3 sm:px-6 lg:px-8">
                    {page.props.can.post_create &&
                        <form onSubmit={submit} className="p-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <label htmlFor="body" className="sr-only">Body</label>
                            <textarea onChange={e => setData('body', e.target.value)} onFocus={() => clearErrors('body')} name="body" id="body" value={data.body} cols={30} rows={5} className='w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'></textarea>
                            {errors.body &&
                                <p className='text-red-500'>{errors.body}</p>
                            }
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-4 py-2 mt-2 font-medium text-white bg-gray-700 rounded-md ${processing && 'opacity-50'}`}
                            >
                                Post
                            </button>
                        </form>
                    }

                    <div className="flex justify-center py-3">
                        <Link
                            href={route('posts.index')}
                            only={['posts']}
                            preserveScroll={true}
                            preserveState={true}
                            type="button"
                            className="text-sm text-indigo-700"
                        >
                            Refresh posts
                        </Link>
                    </div>

                    {posts.data.map((post) => {
                        return (
                            <div key={post.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className='p-6 text-gray-900'>
                                    <div className="font-semibold">
                                        {post.user.name}
                                    </div>
                                    <p className="mt-1">{post.body}</p>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
