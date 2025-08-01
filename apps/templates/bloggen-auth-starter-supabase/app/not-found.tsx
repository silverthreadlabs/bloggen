import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-canvas-bg via-canvas-bg-subtle to-canvas-bg dark:from-[#0A0A0F] dark:via-[#18181B] dark:to-[#23232A] px-4 transition-colors duration-300">
            <div className="w-full max-w-2xl text-center py-16">
                {/* Error Code */}
                <div className="relative mb-6">
                    <h1 className="text-[8rem] sm:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-primary-solid via-primary-solid/70 to-primary-solid/40 dark:from-primary-solid dark:via-primary-solid/60 dark:to-primary-solid/20 select-none drop-shadow-lg">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-3xl sm:text-4xl font-semibold text-canvas-text-contrast dark:text-white/80 bg-clip-text">
                            Page Not Found
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-lg sm:text-xl text-canvas-text dark:text-slate-300 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                {/* Back to Home Button */}
                <div className="pt-4">
                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center rounded-xl border border-canvas-border bg-canvas-bg-subtle px-8 py-3 text-canvas-text-contrast dark:bg-slate-800 dark:border-slate-700 dark:text-white font-semibold shadow-md hover:bg-primary-solid hover:text-primary-on-primary hover:border-primary-solid dark:hover:bg-primary-solid dark:hover:text-primary-on-primary dark:hover:border-primary-solid transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-solid/40">
                        <svg
                            className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}
