import Link from 'next/link';

export default function Navigation() {
    return (
        <>
            <nav className="navigation">
                <h1 className="navigation-logo">
                    <Link
                        href="/"
                        className="navigation-logo-link"
                    >
                        react-template
                    </Link>
                </h1>
                <ul className="navigation-list">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/not-found">Not Found</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
