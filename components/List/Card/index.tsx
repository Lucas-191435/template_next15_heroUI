/* eslint-disable @next/next/no-img-element */
const CardPoke = () => {
  return (
    <div
      className="
    mx-auto
    flex flex-col items-center justify-center
    w-full max-w-[300px] sm:w-[150px] h-[200px]
    bg-white rounded-lg shadow-md
    p-4 transition hover:scale-105 hover:shadow-lg
  "
    >
      <img
        alt="Pokemon"
        className="h-[100px] object-contain mb-2"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/1.png"
      />
      <p className="text-gray-700 text-sm font-medium">Bulbasaur</p>
    </div>
  );
};

export default CardPoke;
