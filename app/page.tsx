import Image from "next/image";
import styles from "./page.module.css";
import { UserList } from "@/lib/user-list";
import Link from "next/link";

export default function Home() {
  return <>

    <Link href='/users/add'>add user</Link>
    <UserList />
  </>
}
