import Slider, {MSG as SliderMSG} from './Slider'
import Component from '../Component'
import * as dom from '../dom'
import * as util from '../util'

/**
 * @method percent
 * @property {Slider} progress
 * @property {Boolean} scrubbing
 * @class Timeline
 */
export default class Timeline extends Component {
	constructor(player) {
		super(player, 'Timeline');
	}

	render(owner) {
		this.createEl('div', {'class': 'vcp-timeline'});
		this.progress = new Slider(this.player, false);
		this.progress.render(this.el);
		this.track = this.progress.track;

		this.timeLabel = dom.createEl('span', {'class': 'vcp-timeline-label'});
		this.el.appendChild(this.timeLabel);

		return super.render(owner);
	}
	setup() {
		this.sub(SliderMSG.Changing, this.progress, util.bind(this, this.handleMsg));
		this.sub(SliderMSG.Changed, this.progress, util.bind(this, this.handleMsg));
	}
	handleMsg(msg) {
		if (msg.type === SliderMSG.Changing) {
			this.scrubbing = true;
			this.syncLabel(this.percent());
		} else if (msg.type === SliderMSG.Changed) {
			this.scrubbing = false;
		}
	}
	syncLabel(p) { // 保持与进度条一致
		var d = this.player.duration();
		if (!d)
			this.timeLabel.innerHTML = '';
		else
			this.timeLabel.innerHTML = util.covertTime(p*d) + '/' + util.covertTime(d);
	}

	buffered(b) {
		this.track.style.width = b * 100 + '%';
	}
	percent(p) {
		if (typeof p === 'undefined') return this.progress.percent() || 0;
		this.syncLabel(p);
		return this.progress.percent(p);
	}
}