import React from 'react'
import 'boxicons'
import { useContext } from 'react'
import { Context } from '../App'

const FrameDesc = () => {
	const [allWordsArray, page, setPage, lang, setLang] = useContext(Context)

	return (
		<div className='frame-desc'>
			<div className='frame'>
				<iframe
					src='https://www.youtube.com/embed/UT9ndxZPXxY'
					title='Túsindirme sózlik mobil qosımshası haqqında'
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
				></iframe>
			</div>
			<div className='frame-description'>
				<h4>{lang ? 'EŃ NÁTIYJELI USILI' : 'EҢ НӘТИЙЖЕЛИ УСЫЛЫ'}</h4>
				<h2>
					{lang
						? 'Sózlerdi úyreniwdiń eń nátiyjeli usılı'
						: 'Сөзлерди үйрениўдиң ең нәтийжели усылы'}
				</h2>
				<p>
					{lang
						? `Sózlerdi úyreniwdiń eń nátiyjeli usılı - tek ǵana biz benen!
					Tusindirmesozlik.uz - Qaraqalpaq tilindegi sózlerdi durıs jazıw hám
					onıń mánisin mısallar járdeminde sizge shaǵıp beriwge járdem beredi!
					Video arqalı veb sayttıń islew funkciyası hám kreativligin tolıǵıraq
					túsinip alasız. Tómendegi "tolıq" túymesin basıń.`
						: `Сөзлерди үйрениўдиң ең нәтийжели усылы - тек ғана биз бенен! Тусиндирмесозлик.уз - Қарақалпақ тилиндеги сөзлерди дурыс жазыў ҳәм оның мәнисин мысаллар жәрдеминде сизге шағып бериўге жәрдем береди! Видео арқалы веб сайттың ислеў ўаункциясы ҳәм креативлигин толығырақ түсинип аласыз. Төмендеги "толық" түймесин басың.`}
				</p>
				<button>
					<a
						target={'_blank'}
						href='https://play.google.com/store/apps/details?id=com.karsoft.tusindirmesozlik'
					>
						{lang ? 'Juklew' : 'Жуклеу'}
					</a>
				</button>
			</div>
		</div>
	)
}

export default FrameDesc
