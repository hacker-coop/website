/* <!-- attribution: blatant copy by vv01f, original script for membership-form by astro --> */
$('.membership-form').each(function() {

function escape(s) {
	return s.toString()
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

var container = $(this);
container.html('<h3>Zusage der Anteilszeichnung</h3>'+
'<p>Ich erkläre mich hiermit verbindlich bereit, der <em>Werkkooperative der Technikfreundinnen</em> beizutreten und binnen eines Jahres nach Gründung, als Einmalzahlung oder in Raten, Anteile (Anhalt für den Gesamtbetrag 500 €) zur Zeichnung an die Genossenschaft zu überweisen.<br/>'+
'Weiterhin bin ich bereit, einen jährlichen Mitgliedsbeitrag (vmtl. rund 100 €) zu leisten.</p>'+
'<p>&nbsp;</p>'+

'<p><input type="radio" name="membership" id="oldmember" value="oldmember" checked="checked"><label for="neumitglied">Ich <strong>bin bereits Mitglied</strong> im VEBIT&nbsp;e. V.</label></p>'+


'<div class="oldmember">'+

'<p><input type="text" id="chiffre"></p>'+
'<p class="desc"><label for="chiffre">Chiffre (wurde im Willkommensbrief mitgeteilt)</label></p>'+

'</div>'+

'<p><input type="radio" name="membership" id="newmember" value="newmember"><label for="neumitglied">Ich <strong>bin noch kein Mitglied</strong> im VEBIT&nbsp;e. V.</label></p>'+
'<div class="newmember">'+

'<p>Ich werden in Kürze mit der folgenden E-Mail (und Fingerprint meines PGP-Schlüssels) dem VEBIT e. V. beitreten.</p>'+
'<p><input type="text" id="email"></p>'+
'<p class="desc"><label for="email">E-Mail (für das Mitgliederverzeichnis und Erreichbarkeit)</label></p>'+
'<p><input type="text" id="pgp"></p>'+
'<p class="desc"><label for="pgp">PGP-Fingerprint (Bitte Key per E-Mail zusenden oder auf einen Keyserver hochladen und diesen benennen)</label></p>'+

'</div>'+

'<p><input type="text" id="nick"></p>'+
'<p class="desc"><label for="nick">Nick (Nationalien bitte mit Beitrittserklärung und Fragebogen, s. PDF-Dateien)</label></p>'+
'<p><input type="text" id="shares" value="5"></p>'+
'<p class="desc"><label for="shares">Anteile (Empfehlung: 5 Anteile zu je 100 €, weniger Anteile bei knappen Mitteln)</label></p>'+
'<p><textarea rows="3" cols="40" id="note"></textarea>'+
'<p class="desc"><label for="note">Bemerkungen (z. B. zur Zahlungsweise)</label></p>'+

'<p><input type="text" id="date"></p>'+
'<p class="desc"><label for="date">Datum</label></p>'+
'<p style="margin: 2rem 0.5rem 1rem">Bitte <a href="#" download="antrag-vebit-wtf.xml" id="ok">Antrag generieren</a> und signiert an <a href="mailto:vorstand@vebit.xyz?subject=Beitrittserklärung&body=Ich%20erkläre%20mich%20bereit%20…" id="mailto">vorstand@vebit.xyz</a> senden!</p>' );

function getText(id) {

	return container.find('#' + id).val();
}
function isChecked(id) {
	return container.find('#' + id).prop('checked');
}

function generateXml() {
	var xml =
		'<membership>\n';

	var nick = getText('nick').toString();
	var shares = getText('shares').toString();
	var note = getText('note').toString();
	var d = getText('date').toString();

	if (isChecked('oldmember')) {
		xml += '  <type>Mitgliedsbeitritt</type>\n';
		var chiffre = getText('chiffre').toString();
	} else if (isChecked('newmember')) {
		xml += '  <type>Mitgliedsantrag</type>\n';
		var email = getText('email').toString();
		var pgp = getText('pgp').toString();
	}

	xml += '  <nick>' + escape(nick) + '</nick>\n';
	xml += '  <shares>' + escape(shares) + '</shares>\n';
	if (chiffre) xml += '  <chiffre>' + escape(chiffre) + '</chiffre>\n';
	if (email) xml += '  <email>' + escape(email) + '</email>\n';
	if (pgp) xml += '  <pgp-fpr>' + escape(pgp) + '</pgp-fpr>\n';
	if (note) xml += '  <note>' + escape(note) + '</note>\n';
	if (d) xml += '  <date>' + escape(d) + '</date>\n';
	xml += '</membership>';
	// console.log('xml: ' + xml);
	return xml;
}

function generateEml() {
	var eml = '';

	var nick = getText('nick').toString(); 
	var shares = getText('shares').toString();
	var note = getText('note').toString();
	var d = getText('date').toString();

	if (isChecked('oldmember')) {
		type = 'Mitgliedsbeitritt';
		var chiffre = getText('chiffre');
	} else if (isChecked('newmember')) {
		type = 'Mitgliedsantrag';
		var email = getText('email');
		var pgp = getText('pgp');
	}
	
	//~ if (email) eml += '<email>' + escape(email) + '</email>\n';
	//~ if (pgp) eml += '  <pgp-fpr>' + escape(pgp) + '</pgp-fpr>\n';
	//~ if (note) eml += '  <note>' + escape(note) + '</note>\n';
	
	eml += 'Ich erkläre mich, ' + nick + ' (Mitglied ' + chiffre + ') hiermit verbindlich bereit, der *Werkkooperative der Technikfreundinnen* beizutreten.\n';
	eml += 'Ich sichere zu, den Betrag von ' + (shares*100) + ' € für ' + shares + ' Anteile binnen eines Jahres nach Gründung zu überweisen und den jährlichen Mitgliedsbeitrag (etwa 100 €) zu leisten.\n';
	eml += 'Ich werde in Kürze mit der E-Mail ' + email + '(' + pgp + ') als Mitglied dem VEBIT e. V. beitreten.' + '\n';
	eml += note + '\n\n';
	eml += d;

	// console.log('eml: ' + eml);
	return eml;
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
	var emlUri = 'mailto:vorstand@vebit.xyz?subject=Beitrittserklärung&body=' + encodeURIComponent(generateEml());
	container.find('#ok').attr('href', xmlUri);
	container.find('#mailto').attr('href', emlUri);
}

container.find('input').on('change', update);
container.find('textarea').on('change', update);
update();


});