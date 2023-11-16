const axios = require("axios");
const URL = "https://genius-song-lyrics1.p.rapidapi.com/chart/songs/";
const API_HOST = "genius-song-lyrics1.p.rapidapi.com";
const { rapidApiKey } = require("../config");

// Quota Limit 100 / month
async function fetchSongs(time = "all_time", genre = "all") {
  const options = {
    method: "GET",
    url: URL,
    // params are optional
    params: {
      time_period: time, // day, week, month, all_time
      chart_genre: genre, // all, rap, pop, rb, rock, country
      per_page: 10, // number of results return per request
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": API_HOST,
    },
  };
  try {
    const response = await axios.request(options);
    const items = response.data.chart_items;

    const dataArray = items.map((item) => {
      const {
        artist_names,
        title,
        url,
        release_date_for_display,
        header_image_thumbnail_url,
      } = item.item;

      return {
        artist: artist_names || "no artist",
        title: title || "no title",
        url: url || "no url",
        date: release_date_for_display || "no releast date",
      };
    });

    return dataArray;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { fetchSongs };

// data returned
// {
//     _type: 'chart_item',
//     type: 'song',
//     item: {
//       _type: 'song',
//       annotation_count: 19,
//       api_path: '/songs/3057010',
//       artist_names: 'Luis Fonsi & Daddy Yankee (Ft. Justin Bieber)',
//       full_title: 'Despacito (Remix) by Luis Fonsi & Daddy Yankee (Ft. Justin Bieber)',
//       header_image_thumbnail_url: 'https://images.genius.com/93e9e3fa0ab18bc4613d385f287090c6.300x300x1.jpg',
//       header_image_url: 'https://images.genius.com/93e9e3fa0ab18bc4613d385f287090c6.1000x1000x1.jpg',
//       id: 3057010,
//       instrumental: false,
//       lyrics_owner_id: 104344,
//       lyrics_state: 'complete',
//       lyrics_updated_at: 1690017978,
//       path: '/Luis-fonsi-and-daddy-yankee-despacito-remix-lyrics',
//       pyongs_count: 416,
//       relationships_index_url: 'https://genius.com/Luis-fonsi-and-daddy-yankee-despacito-remix-sample',
//       release_date_components: { year: 2017, month: 4, day: 17 },
//       release_date_for_display: 'April 17, 2017',
//       release_date_with_abbreviated_month_for_display: 'Apr. 17, 2017',
//       song_art_image_thumbnail_url: 'https://images.genius.com/4164dff756ddd455675789bd67fe5f1a.300x300x1.png',
//       song_art_image_url: 'https://images.genius.com/4164dff756ddd455675789bd67fe5f1a.1000x1000x1.png',
//       stats: { unreviewed_annotations: 8, hot: false, pageviews: 23530781 },
//       title: 'Despacito (Remix)',
//       title_with_featured: 'Despacito (Remix) (Ft. Justin Bieber)',
//       updated_by_human_at: 1693663880,
//       url: 'https://genius.com/Luis-fonsi-and-daddy-yankee-despacito-remix-lyrics',
//       featured_artists: [ [Object] ],
//       primary_artist: {
//         _type: 'artist',
//         api_path: '/artists/1119780',
//         header_image_url: 'https://images.genius.com/be123903c448d5f64ddac6476dc50aa4.847x476x1.jpg',
//         id: 1119780,
//         image_url: 'https://images.genius.com/365d323e22c93fe869478efde436d233.393x393x1.jpg',
//         index_character: 'l',
//         is_meme_verified: false,
//         is_verified: false,
//         name: 'Luis Fonsi & Daddy Yankee',
//         slug: 'Luis-fonsi-and-daddy-yankee',
//         url: 'https://genius.com/artists/Luis-fonsi-and-daddy-yankee'
//       }
//     }
//   }
