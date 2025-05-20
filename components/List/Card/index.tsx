const CardPoke = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100px] h-[150px] bg-white rounded-lg shadow-md">
      <img
        alt="Pokemon"
        className="h-[100px]"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/1.png"
      />
      {/* <h2 className="text-xl font-bold">Pokemon Name</h2> */}
      <p className="text-gray-600">Bulbasaur</p>
    </div>
  );
};

export default CardPoke;
