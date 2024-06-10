import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Pet, { Pets } from "../models/Pet";
import HangmanGame from "../components/HangmanGame";
import { GetServerSideProps } from "next";

type Props = {
  pets: Pets[];
};

const Index = ({ pets }: Props) => {
  return (
    <>
      <div className="top-bar">
        <img src="/logo.png" alt="Logo" id="logo" />
        <div id="title">Application by Daniel Nikolai</div>
      </div>
      {pets.map((pet) => (
        <div key={pet._id.toString}>
          <div className="card">
            <img src={pet.image_url} />
            <h5 className="pet-name">{pet.name}</h5>
            <div className="main-content">
              <p className="pet-name">{pet.name}</p>
              <p className="owner">Owner: {pet.owner_name}</p>

              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>

              <div className="btn-container">
                <Link href={{ pathname: "/[id]/edit", query: { id: pet._id.toString } }}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href={{ pathname: "/[id]", query: { id: pet._id.toString } }}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <HangmanGame />
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  const result = await Pet.find({});

  const pets = result.map((doc) => {
    const pet = JSON.parse(JSON.stringify(doc));
    return pet;
  });

  return { props: { pets: pets } };
};

export default Index;
