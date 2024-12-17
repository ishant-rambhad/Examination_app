import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For optimized images

const LoggedOut = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <Image src="/images/Sambhav logo.png" alt="Sambhav Logo" width={150} height={100} style={styles.logo} />
            </header>
            <main style={styles.main}>
                <h1 style={styles.title}>Logged Out</h1>
                <p style={styles.subtitle}>
                    Thank you for using <strong>Sambhav</strong>.
                </p>
                <Link href="/" style={styles.button}>
                    Sign in Again
                </Link>
            </main>
            <footer style={styles.footer}>
                <p>
                    Sambhav, Inc |{' '}
                    <a
                        href="https://www.apache.org/licenses/LICENSE-2.0"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#fff', textDecoration: 'underline' }}
                    >
                        User subject to MIT LICENSE
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default LoggedOut;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    header: {
        width: '100%',
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    logo: {
        height: '40px',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: '48px',
        margin: '20px 0',
    },
    subtitle: {
        fontSize: '18px',
        marginBottom: '30px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        textDecoration: 'none',
    },
    footer: {
        width: '100%',
        padding: '10px 0',
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: '14px',
    },
};
