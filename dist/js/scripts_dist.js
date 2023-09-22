let pokemonRepository = (function () {
    let t = []
    function e() {
        return t
    }
    function n(e) {
        'object' == typeof e && 'name' in e && 'detailsUrl' in e
            ? t.push(e)
            : console.log('pokemon is not correct')
    }
    function o(t) {
        return fetch(t.detailsUrl)
            .then(function (t) {
                return t.json()
            })
            .then(function (e) {
                ;(t.imageUrl = e.sprites.front_default),
                    (t.height = e.height),
                    (t.types = e.types),
                    (t.types = [])
                for (var n = 0; n < e.types.length; n++)
                    t.types.push(e.types[n].type.name)
                t.abilities = []
                for (var n = 0; n < e.abilities.length; n++)
                    t.abilities.push(e.abilities[n].ability.name)
            })
            .catch(function (t) {
                console.error(t)
            })
    }
    function i(t) {
        o(t).then(function () {
            var e
            let n, o, i, a, p, l, r
            ;(e = t),
                (n = $('.modal-body')),
                (o = $('.modal-title')),
                $('.modal-header'),
                o.empty(),
                n.empty(),
                (i = $('<h1>' + e.name + '</h1>')),
                (a = $('<img>')),
                a.addClass('modal-img'),
                a.attr('src', e.imageUrl),
                (p = $('<p>HEIGHT: ' + e.height + '</p>')),
                (l = $('<p>TYPES: ' + e.types.join(', ') + '</p>')),
                (r = $('<p>ABILITIES: ' + e.abilities.join(', ') + '</p>')),
                o.append(i),
                n.append(a),
                n.append(p),
                n.append(l),
                n.append(r)
        })
    }
    return {
        add: n,
        getAll: e,
        addListItem: function t(e) {
            let n = $('.list-group'),
                o = $('<li></li>')
            o.addClass('list-group-item')
            let a = $('<button></button>')
            a.addClass('btn', 'btn-primary'),
                a.attr('data-toggle', 'modal'),
                a.attr('data-target', '#pokemonModal'),
                a.text(e.name),
                o.append(a),
                n.append(o),
                a.click(function () {
                    i(e)
                })
        },
        showDetails: i,
        loadList: function t() {
            return fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
                .then(function (t) {
                    return t.json()
                })
                .then(function (t) {
                    t.results.forEach(function (t) {
                        n({ name: t.name, detailsUrl: t.url })
                    })
                })
                .catch(function (t) {
                    console.error(t)
                })
        },
        loadDetails: o,
    }
})()
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (t) {
        pokemonRepository.addListItem(t)
    })
})
