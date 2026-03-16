// On récupère les animes les mieux notés au lieu d'un seul
const API_URL = `https://api.jikan.moe/v4/top/anime?limit=6`;

async function topAnime() {
    const container = document.getElementById('top-anime-container');

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const jsonResponse = await response.json();
        const animes = jsonResponse.data;

        container.innerHTML = '';

        animes.forEach(anime => {
            const dateSortieFr = anime.aired.from ? new Date(anime.aired.from).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : 'Date inconnue';

            const cardHTML = `
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-sm w-full transform transition-all hover:scale-105 duration-300">
                    
                    <div class="relative">
                        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" class="w-full h-64 object-cover object-center">
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <h2 class="text-2xl font-bold text-white tracking-tight">${anime.title}</h2>
                            <p class="text-orange-300 font-medium">${anime.title_japanese}</p>
                        </div>
                    </div>

                    <div class="p-6 bg-white">
                        <div class="grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
                            
                            <div class="flex items-center gap-3">
                                <div class="bg-amber-100 text-amber-700 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
                                </div>
                                <div>
                                    <p class="text-gray-500">Note</p>
                                    <p class="font-bold text-lg text-gray-900">${anime.score || 'N/A'}<span class="text-xs text-gray-500">/10</span></p>
                                </div>
                            </div>

                            <div class="flex items-center gap-3">
                                <div class="bg-blue-100 text-blue-700 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p class="text-gray-500">Épisodes</p>
                                    <p class="font-bold text-lg text-gray-900">${anime.episodes || '?'}</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-3 col-span-2 border-t border-gray-100 pt-4">
                                <div class="bg-gray-100 text-gray-700 p-3 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p class="text-gray-500">Date de sortie</p>
                                    <p class="font-bold text-gray-900">${dateSortieFr}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML += cardHTML;
        });

    } catch (error) {
        container.innerHTML = `
                    <div class="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center shadow-lg col-span-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <p class="font-bold">Impossible de charger les données.</p>
                        <p class="text-sm">${error.message}</p>
                    </div>
                `;
        console.error("Erreur détaillée:", error);
    }
}

async function randomAnime() {
    const container = document.getElementById('random-anime-container');
    const button = document.getElementById('random-anime-button');


    button.disabled = true;
    button.textContent = 'Chargement...';
    container.innerHTML = `
        <div class="text-center p-10 text-gray-500">
            Recherche d'un anime...
        </div>
    `;

    try {
        const response = await fetch('https://api.jikan.moe/v4/random/anime');

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const jsonResponse = await response.json();
        const anime = jsonResponse.data;

        const createTags = (items) => {
            if (!items || items.length === 0) return '<span class="text-gray-500">N/A</span>';
            return items.map(item => `<span class="bg-gray-200 text-gray-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full inline-block">${item.name}</span>`).join('');
        };

        const synopsis = anime.synopsis ? anime.synopsis.replace(/\n/g, '<br>') : 'Aucun synopsis disponible.';

        const cardHTML = `
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden w-full flex flex-col lg:flex-row">
                <div class="lg:w-1/3">
                    <img src="${anime.images.jpg.large_image_url}" alt="Affiche de ${anime.title}" class="w-full h-64 lg:h-full object-cover">
                </div>

                <!-- Details Section -->
                <div class="lg:w-2/3 p-6 md:p-8 flex flex-col">
                    <h2 class="text-3xl font-bold text-gray-900">${anime.title}</h2>
                    <p class="text-lg text-orange-500 font-medium mb-4">${anime.title_japanese}</p>

                    <!-- Stats -->
                    <div class="flex flex-wrap gap-x-6 gap-y-2 mb-4 border-b border-t border-gray-200 py-3">
                        <div class="flex items-center gap-2" title="Score"><span class="text-amber-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span><span class="font-bold text-gray-700">${anime.score || 'N/A'}</span></div>
                        <div class="flex items-center gap-2" title="Classement"><span class="font-bold text-gray-700">#Rang :${anime.rank || 'N/A'}</span></div>
                    </div>
                    
                    <!-- Synopsis -->
                    <div class="mb-4 flex-grow">
                        <h3 class="font-bold text-gray-800 mb-2">Synopsis</h3>
                        <p class="text-gray-600 text-sm h-32 overflow-y-auto pr-2">${synopsis}</p>
                    </div>

                    <!-- More Details -->
                    <div class="text-sm space-y-3">
                        <div><strong class="text-gray-600 w-20 inline-block">Genres:</strong> ${createTags(anime.genres)}</div>
                        <div><strong class="text-gray-600 w-20 inline-block">Studios:</strong> ${createTags(anime.studios)}</div>
                    </div>

                    <!-- MAL Link -->
                    <div class="mt-auto pt-6 text-right">
                        <a href="${anime.url}" target="_blank" rel="noopener noreferrer" class="inline-block bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-semibold">Voir sur MyAnimeList</a>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = cardHTML;

    } catch (error) {
        container.innerHTML = `<div class="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center shadow-lg w-full"><p class="font-bold">Impossible de charger un anime aléatoire.</p><p class="text-sm">${error.message}</p></div>`;
        console.error("Erreur détaillée:", error);
    } finally {
        button.disabled = false;
        button.textContent = 'Générer un anime aléatoire';
    }
}



topAnime();
randomAnime();

document.getElementById('random-anime-button').addEventListener('click', randomAnime);