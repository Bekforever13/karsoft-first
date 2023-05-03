import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Alphabet from '../../components/Alphabet'
import './About.scss'

const About = () => {
	window.scrollTo({ top: 400, behavior: 'smooth' })
	return (
		<div>
			<Header />
			<div className='about'>
				<div className='container'>
					<h2>Baǵdarlama haqqında:</h2>
					<p>
						Bul platforma – 1982-1992-jılları kitap bolıp basılıp shıqqan
						“Qaraqalpaq tiliniń túsindirme sózligi”niń 4 tomlıǵı tiykarında
						islep shıǵılǵan. Bul baǵdarlamaǵa 4 tomlıqtaǵı sózler ózgerssiz
						kirgizilgen. Sonlıqtan, bunda sol dáwirge tiyisli bolǵan kóplegen
						sózler de ushırasıwı múmkin. Biraq, ótken dáwirge tiyisli ayırım
						ideologiyalıq baǵdardaǵı sózlerdiń mánisin biliw de áhmiyetli.
						Házirgi waqıtta qaraqalpaq tilshileri tárepinen Túsindirme sózliktiń
						6 tomlıǵı tayarlanbaqta. Usı jańa zamanǵa say sózler menen
						tolıqtırılǵan usı kóp tomlıqtaǵı sózler bizlerdiń platformamızǵa
						kiritilip barıladı. Álbette, bul platformada ayırım kemshilikler
						bolıwı múmkin. Bunı aldaǵı waqıtlarda dúzetip baramız.
						Tusindirmesozlik.uz – sanlı baǵdarlama bolıp, bunda qaraqalpaq
						tiliniń altın ǵáziynesinen orın alǵan kóp mıńlaǵan sózlerdiń
						sinonimleri, mánisi, etimologiyası mısallar járdeminde beriledi. Siz
						bul platformada qálegen waqıtta hám qálegen orında paydalanıw
						imkaniyatına iye bolasız. Bizlerdiń tiykarǵı maqsetimiz – qaraqalpaq
						tilin internet global tarmaǵına qosıw arqalı rawajlandırıw. Jaqın
						keleshekte platformanı taǵı da jetilistirip, oǵan audiovariantlardı
						da qosıwdı rejelestirgenmiz. Eger de Ana tilimizdiń rawajlanıwına
						úles qosqıńız kelse, biziń platformamızdı qollap-quwatlawıńızdı
						soraymız! Platforma "Bookie" qaraqalpaq tilindegi audiokitaplar hám
						"KARSOFT-IT-SOLUTIONS" JSHJ tárepinen islep shıǵıldı. Bul joybar
						Qaraqalpaqstan Respublikası Ministrler Keńesi janındaǵı Qaraqalpaq
						tilin rawajlandırıw fondı tárepinen qollap-quwatlandı.
					</p>
				</div>
			</div>
			<Alphabet />
			<Footer />
		</div>
	)
}

export default About
