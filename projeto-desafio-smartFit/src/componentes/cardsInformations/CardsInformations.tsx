export function CardsInformations() {
  return (
    <div className="pt-10">
      <div className="flex justify-between w-full gap-4 px-2 py-5 text-center bg-gray-200">
        <div>
          <span>Mascara</span>
          <div className="flex gap-2 ">
            <div>
              <img src="./assets/required-mask.png" className="w-10" />
              <p>Obrigatorio</p>
            </div>
            <div>
              <img src="./assets/recommended-mask.png" className="w-10" />
              <p>Recomendado</p>
            </div>
          </div>
        </div>

        <div>
          <span>Toalha</span>
          <div className="flex gap-2">
            <div>
              <img src="./assets/required-towel.png" className="w-10" />
              <p>Obrigatorio</p>
            </div>
            <div>
              <img src="./assets/recommended-towel.png" className="w-10" />
              <p>Recomendado</p>
            </div>
          </div>
        </div>

        <div>
          <span>Bebedouro</span>
          <div className="flex gap-2">
            <div>
              <img src="./assets/partial-fountain.png" className="w-10" />
              <p>Parcial</p>
            </div>
            <div>
              <img src="./assets/forbidden-fountain.png" className="w-10" />
              <p>Proibido</p>
            </div>
          </div>
        </div>

        <div>
          <span>Vestiários</span>
          <div className="flex gap-2">
            <div>
              <img src="./assets/required-lockerroom.png" className="w-10" />
              <p>Liberado</p>
            </div>
            <div>
              <img src="./assets/partial-lockerroom.png" className="w-10" />
              <p>Parcial</p>
            </div>

            <div>
              <img src="./assets/forbidden-lockerroom.png" className="w-10" />
              <p>Proibido</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
