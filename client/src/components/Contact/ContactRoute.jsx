import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import ContactForm from "./ContactForm";

export default function Contact() {
  const user = useSelector((state) => state.currentUser);
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoading = useSelector((state) => state.isLoading);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if ((user && !isAdmin) || !user) {
        let a;
      } else {
          console.log("navigate del coctact container");
        navigate("/*");
      }
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div>
          <ContactForm />
        </div>
      )}
    </div>
  );
}
