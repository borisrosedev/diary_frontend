import logo from "/diary-logo.webp"

export default function Index(){

    return (
        <main className="app-main home__main">
                <section className="home__logo">
                  <figure>
                    <img src={logo} alt="logo Diary"/>
                  </figure>
                  <button className="custom-button">
                    Entrer
                  </button>
                </section>
          </main>
    )

}