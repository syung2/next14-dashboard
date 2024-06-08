export default function ServerAction() {
  const handleForm = async (formData: FormData) => {
    "use server";
    console.log(formData);
    const username = formData.get("username");
    console.log(username);
  };
  return (
    <>
      <form action={handleForm}>
        <input type="text" name="username" />
        <button>send</button>
      </form>
    </>
  );
}
