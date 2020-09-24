<!-- attribution: blatant copy by vv01f, original script for membership-form by astro -->
$('.membership-form').each(function() {
	function escape(s='') {
		return s.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}

    var container = $(this);
    container.html('<h3>Zusage der Anteilszeichnung</h3>'+
'<p>Ich erkläre mich hiermit verbindlich bereit, der <em>Werkkooperative der Technikfreundinnen</em> beizutreten und binnen eines Jahres nach Gründung, als Einmalzahlung oder in Raten, Anteile (Anhalt für den Gesamtbetrag 500 €) zur Zeichnung an die Genossenschaft zu überweisen.<br/>'+
'Weiterhin bin ich bereit, einen jährlichen Mitgliedsbeitrag (vmtl. rund 100 €) zu leisten.</p>'+
'<p>&nbsp;</p>'+
'<p><input type="radio" name="membership" id="oldmember" value="oldmember"><label for="neumitglied">Ich <strong>bin bereits Mitglied</strong> im VEBIT&nbsp;e. V.</label></p>'+
'<div class="oldmember">'+

'<p><input type="text" id="nick"></p>'+
'<p class="desc"><label for="nick">Nick</label></p>'+
'<p><input type="text" id="chiffre"></p>'+
'<p class="desc"><label for="chiffre">Chiffre</label></p>'+
'<p><input type="text" id="shares" value="5"></p>'+
'<p class="desc"><label for="shares">Anteile (Empfehlung: 5 Anteile zu je 100 €, weniger Anteile bei knappen Mitteln)</label></p>'+
'<p><textarea rows="3" cols="40" id="note"></textarea>'+
'<p class="desc"><label for="note">Bemerkungen</label></p>'+

'</div>'+

'<p><input type="radio" name="membership" id="newmember" value="newmember"><label for="neumitglied">Ich <strong>bin noch kein Mitglied</strong> im VEBIT&nbsp;e. V.</label></p>'+
'<div class="newmember">'+

'<p><input type="text" id="nick"></p>'+
'<p class="desc"><label for="nick">Nick</label></p>'+
'<p><input type="text" id="email"></p>'+
'<p class="desc"><label for="email">Chiffre</label></p>'+
'<p><input type="text" id="pgp"></p>'+
'<p class="desc"><label for="pgp">PGP-Fingerprint</label></p>'+
'<p><input type="text" id="shares" value="5"></p>'+
'<p class="desc"><label for="shares">Anteile (Empfehlung: 5 Anteile zu je 100 €, weniger Anteile bei knappen Mitteln)</label></p>'+
'<p><textarea rows="3" cols="40" id="note"></textarea>'+
'<p class="desc"><label for="note">Bemerkungen</label></p>'+

'</div>'+

'<p><input type="text" id="date"></p>'+
'<p class="desc"><label for="date">Datum</label></p>'+
'<p style="margin: 2rem 0.5rem 1rem">Bitte <a href="#" download="antrag-vebit-wtf.xml" id="ok">Antrag generieren</a> und signiert an <a href="mailto:vorstand@vebit.xyz?subject=Beitrittserklärung&body=Ich%20erkläre%20mich%20bereit%20…">vorstand@vebit.xyz</a> senden!</p>' );

function getText(id) {
	return container.find('#' + id).val();
}
function isChecked(id) {
	return container.find('#' + id).prop('checked');
}

function generateXml() {
	var xml =
		'<member';
	if (isChecked('neumitglied') && isChecked('foerder')) xml += ' type="Fördermitglied"';

	xml += '>\n  <name>' +
		escape(getText('name')) +
		'</name>\n  <email>' +
		escape(getText('email')) +
		'</email>\n';
	
	var pgp = getText('pgp');
	if (pgp) xml += '  <pgp-fpr>' + escape(getText('pgp')) + '</pgp-fpr>\n';

	if (isChecked('neumitglied')) {
		var rate = isChecked('ordentlich') ? 42 :
			isChecked('reduziert') ? 13.37 : 0;
		xml += '  <term rate="' + rate + '" start="' + getText('date') + '"/>\n';
	}
	var note = getText('note');
	if (note) xml += '  <note>' + escape(note) + '</note>\n';
	
	xml +=
		'</member>';
	// console.log('xml: ' + xml);
	return xml;
}

function update() {
	if (isChecked('newmember')) {
		container.find('.oldmember').hide();
		container.find('.newmember').show();
	} else {
		container.find('.newmember').hide();
	}
	if (isChecked('oldmember')) {
		container.find('.newmember').hide();
		container.find('.oldmember').show();
	} else {
		container.find('.oldmember').hide();
	}
	if (!getText('date')) {
		var d = new Date();
		d.setHours(23);
		d.setDate(1);
		var s = d.toISOString().replace(/T.+/, "");
		container.find('#date').val(s);
		
	}

	var xmlUri = 'data:application/xml;charset=utf-8,' + encodeURIComponent(generateXml());
	container.find('#ok').attr('href', xmlUri);
}

container.find('input').on('change', update);
container.find('textarea').on('change', update);
update();

});
