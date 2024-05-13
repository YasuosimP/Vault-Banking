import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="dark flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image 
            src="/icons/auth-image.svg"
            alt="Auth image"
            width={1500}
            height={1500}
            className="rounded-l-l object-contain"
          />
        </div>
      </div>
    </main>
  );
}
