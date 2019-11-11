'use strict';

function Creature(animal) {
    this.keyword = animal.keyword;
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.horns = animal.horns;
}
Creature.allCreatures = [];

Creature.prototype.render = function() {
    $('main').append('<div class="clone"></div>');
    let creatureClone = $('div[class="clone"]');
    let creatureHtml = $('#photo-template').html();
    creatureClone.html(creatureHtml);
    creatureClone.find('h2').text(this.title);
    creatureClone
        .find('img')
        .attr('src', this.image_url)
        .attr('alt', this.description);
    creatureClone.find('p').text(this.description);
    creatureClone.removeClass('clone');
    creatureClone.attr('class', this.keyword).addClass('animal');
};

Creature.readJson = () => {
    $.get('../data/page-1.json', 'json')
        .then(data => {
            data.forEach(item => {
                Creature.allCreatures.push(new Creature(item));
            });
        })
        .then(Creature.loadCreatures);
};

Creature.loadCreatures = () => {
    Creature.allCreatures.forEach(item => item.render());
    Creature.makeOption();
};

$(() => Creature.readJson());
// Below is JS for creating list options
Creature.SelectOptions = [];

Creature.makeOption = function() {
    let SelectOptionsClone = this.SelectOptions;
    Creature.allCreatures.forEach(function(critter) {
        if ($.inArray(critter.keyword, SelectOptionsClone) === -1) {
            SelectOptionsClone.push(critter.keyword);
        }
    });
    // Below is updating the list on site
    for (var i = 0; i < SelectOptionsClone.length; i++) {
        $('select').append(
            '<option value=' + SelectOptionsClone[i] + '>' + SelectOptionsClone[i] + '</option>'
        );
    }
};


// event listener for drop down menu
$('select[name="choice"]').on('change', function() {
    let $selection = $(this).val();
    $('.animal').hide();
    $('.' + $selection).show();

})