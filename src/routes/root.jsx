import { Outlet, Link, useLoaderData, Form, } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}

/**
 * post후에 새로고침하는 useEffect등의 훅이 없다.
 * post는 데이터가 변경되는 것을 의미하기 때문에 react router에서 자동으로
 * useLoaderData가 끝난 후에, rerender해준다.
 *
 * react router는 기존의 POST, GET모델을 본따 만들어졌다.
 * 기존의 POST도 데이터를 보낸 후, redirect하면, 다시 데이터를 fetch한다.
 * 따라서 client side routing에서도 redirect시 별도의 코드 없이
 * 자동으로 다시 데이터를 sync하도록 설계했다.
 */
export async function action() {
    const contact = await createContact();
    return { contact };
}

export default function Root() {
    const { contacts } = useLoaderData();

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <Link to={`contacts/${contact.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}