import React from 'react'
import 'boxicons'

const FrameDesc = () => {
	return (
		<div className='frame-desc'>
			<div className='frame'>
				<iframe
					width='370'
					height='210'
					src='https://www.youtube.com/embed/UT9ndxZPXxY'
					title='Túsindirme sózlik mobil qosımshası haqqında'
					frameborder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowfullscreen
				></iframe>
			</div>
			<div className='frame-description'>
				<h4>EŃ NÁTIYJELI USILI</h4>
				<h2>Sózlerdi úyreniwdiń eń nátiyjeli usılı</h2>
				<p>
					Sózlerdi úyreniwdiń eń nátiyjeli usılı - tek ǵana biz benen!
					Tusindirmesozlik.uz - Qaraqalpaq tilindegi sózlerdi durıs jazıw hám
					onıń mánisin mısallar járdeminde sizge shaǵıp beriwge járdem beredi!
					Video arqalı veb sayttıń islew funkciyası hám kreativligin tolıǵıraq
					túsinip alasız. Tómendegi "tolıq" túymesin basıń.
				</p>
				<button>
					<a href='https://play.google.com/store/apps/details?id=com.karsoft.tusindirmesozlik'>
						Download app
					</a>
				</button>
			</div>
		</div>
	)
}

export default FrameDesc
