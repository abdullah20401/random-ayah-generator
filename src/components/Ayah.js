import React, { useState, useEffect } from "react";

import twitterIcon from "../twitter.svg";

const Ayah = () => {
  const [ayah, setAyah] = useState();
  const [ayahNumber, setAyahNumber] = useState();
  const [surahTranslation, setSurahTranslation] = useState();
  const [surahDetails, setSurahDetails] = useState([[], [], [], []]);

  useEffect(() => {
    getAyah();
  }, []);

  const getAyah = () => {
    console.log('ran')
    let randomNum = Math.floor(Math.random() * 6236);
    let url = `https://api.alquran.cloud/v1/ayah/${randomNum}/editions/quran-uthmani,en.sahih`;

    fetch(url)
      .then((response) => response.json())
      .then(({ data }) => {
        setAyah(data[0].text);
        setAyahNumber(data[0].numberInSurah);

        setSurahTranslation(data[1].text);

        setSurahDetails([
          [data[0].surah.number],
          [data[0].surah.name],
          [data[0].surah.englishName.replace(/aa/g, 'ā').replace(/ee/g, 'ī').replace(/oo/g, 'ū')],
          [data[0].surah.englishNameTranslation],
        ]);
      });
  };
  return (
    <div id="ayah-box">
      <div id="text">
        <p>{ayah}</p>
      </div>
      <div id="ayah-translation">
        <h4>
          <b>
            <div id="translation-text">{surahTranslation}</div>
          </b>
        </h4>
      </div>

      <div id="ayah-number">
        <p>{`${surahDetails[0]}:${ayahNumber}`}</p>
      </div>

      <div id="surah-details">
        <p>{`${surahDetails[1]} - Surah ${surahDetails[2]} (${surahDetails[3]})`}</p>
      </div>

      <div id="buttons">
        <div className="social-media">
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=Surah%20${surahDetails[2]}%20[${surahDetails[0]}:${ayahNumber}]%0A%0A${ayah}%0A%0A${surahTranslation}%0A%0AShared via:`}
            id="tweet-ayah"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <img src={twitterIcon} alt="" />
            </span>
          </a>
        </div>

        <button id="new-ayah" onClick={getAyah}>
          New Ayah
        </button>
      </div>
    </div>
  );
};

export default Ayah;
