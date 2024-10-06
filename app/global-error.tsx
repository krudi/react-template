'use client'

import NextError from "next/error";

import { GlobalErrorProps } from "~/types/Layouts"

export default function GlobalError({ reset }: GlobalErrorProps) {
    return (
        <html>
            <body>
                <section>
                    <h3>
                        <b>Page:</b> global-error.tsx
                    </h3>

                    <hr className="hr" />

                    <h4>
                        Something went wrong!
                    </h4>
                    <p>
                        <NextError statusCode={0} />
                    </p>
                    <button onClick={() => reset()}>
                        Try again
                    </button>
                </section>
            </body>
        </html>
    )
}
