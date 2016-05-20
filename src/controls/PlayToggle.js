import Component from '../Component'
import * as dom from '../dom'
import * as message from '../message'
import * as util from '../util'

export default class PlayToggle extends Component {
	constructor(player) {
		super(player, 'PlayToggle', 'button');
	}

	render(owner) {
		this.createEl('input', {type: 'button', 'class': 'vcp-playtoggle', value: 'play'});

		return super.render(owner);
	}
	setup() {
		this.on('click', this.onClick);
		message.sub('play', 'video', util.bind(this, this.handleMsg));
		message.sub('pause', 'video', util.bind(this, this.handleMsg));
	}
	destroy() {
		message.unsub('*', this.handleMsg);
	}
	onClick() {
		var video = this.player.video;
		if (video.paused())
			video.play();
		else
			video.pause();
	}
	handleMsg(msg) {
		console.log(this.__name, msg);
	}
}