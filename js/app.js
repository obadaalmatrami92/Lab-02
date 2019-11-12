'use strict';

function RandomHorn(animal) {
    this.keyword = animal.keyword;
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.horns = animal.horns;
}
RandomHorn.allCreatures = [];

RandomHorn.prototype.render = function() {
    $('main').append('<div class="clone"></div>');
    let Hornoutput = $('div[class="clone"]');
    let creatureHtml = $('#photo-template').html();
    Hornoutput.html(creatureHtml);
    Hornoutput.find('h2').text(this.title);
    Hornoutput
        .find('img')
        .attr('src', this.image_url)
        .attr('alt', this.description);
    Hornoutput.find('p').text(this.description);
    Hornoutput.removeClass('clone');
    Hornoutput.attr('class', this.keyword).addClass('animal');
};

RandomHorn.readJson = () => {
    $.get('../data/page-1.json', 'json')
        .then(data => {
            data.forEach(item => {
                RandomHorn.allCreatures.push(new RandomHorn(item));
            });
        })
        .then(RandomHorn.loadCreatures);
};

RandomHorn.loadCreatures = () => {
    RandomHorn.allCreatures.forEach(item => item.render());
    RandomHorn.makeOption();
};

$(() => RandomHorn.readJson());
RandomHorn.SelectOptions = [];

RandomHorn.makeOption = function() {
    let SelectOptionsClone = this.SelectOptions;
    RandomHorn.allCreatures.forEach(function(critter) {
        if ($.inArray(critter.keyword, SelectOptionsClone) === -1) {
            SelectOptionsClone.push(critter.keyword);
        }
    });
    for (let i = 0; i < SelectOptionsClone.length; i++) {
        $('select').append(
            '<option value=' + SelectOptionsClone[i] + '>' + SelectOptionsClone[i] + '</option>'
        );
    }
};


$('select[name="choice"]').on('change', function() {
    let $selection = $(this).val();
    $('.animal').hide();
    $('.' + $selection).show();

})