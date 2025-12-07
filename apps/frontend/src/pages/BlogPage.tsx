import LandingNavBar from "@/components/landing/LandingNavBar.tsx";
import WorkInProgress from "@/components/WorkInProgress";
//import { useParams } from "react-router-dom";

export default function BlogPage() {
  //const blog_id = useParams<'blog_id'>().blog_id;

  return (
      <>
        <LandingNavBar />
        <WorkInProgress />
      </>
  )
}
