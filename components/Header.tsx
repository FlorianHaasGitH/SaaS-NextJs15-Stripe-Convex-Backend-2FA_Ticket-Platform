import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.png";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
const Header = () => {
  return (
    <div className="border-b">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/" className="font-bold shrink-0">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-24 lg:w-28"
            />
          </Link>

          <div className="lg:hidden">
            <SignedIn>
              <UserButton />
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-gray-100 text-gray-800 px-3 py-1.5 text-sm rounded-lg hover:bg-gray-200 transition border border-gray-300">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
