
const cover=document.getElementById('cover'),
openBtn=document.getElementById('openInvitation'),
music=document.getElementById('bgMusic'),
musicToggle=document.getElementById('musicToggle'),
form=document.getElementById('rsvpForm'),
toast=document.getElementById('toast');

let volumeFadeToken=0;
async function playMusic(){
  try{
    await music.play();
    musicToggle.classList.remove('is-paused');
    // Âm lượng tăng dần đến 75% âm lượng file gốc, tránh bật nhạc quá đột ngột.
    const token=++volumeFadeToken;
    music.volume=0;
    const target=1.0, duration=2200, start=performance.now();
    function fade(now){
      if(token!==volumeFadeToken || music.paused) return;
      const progress=Math.min(1,(now-start)/duration);
      music.volume=target*progress;
      if(progress<1) requestAnimationFrame(fade);
    }
    requestAnimationFrame(fade);
  }
  catch(e){musicToggle.classList.add('is-paused')}
}
function pauseMusic(){volumeFadeToken++;music.pause();musicToggle.classList.add('is-paused')}

openBtn.addEventListener('click',async()=>{
  openBtn.disabled=true;
  await playMusic();
  cover.classList.add('opening');
  setTimeout(()=>{
    cover.classList.add('is-open');
    window.scrollTo({top:0,behavior:'smooth'});
  },1750);
});

musicToggle.addEventListener('click',async()=>{
  if(music.paused) await playMusic(); else pauseMusic();
});

form.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('guestName').value.trim();
  const attendance=new FormData(form).get('attendance');
  toast.textContent=attendance==='Có'
    ? `Cảm ơn ${name}! Hẹn gặp bạn trong ngày vui của Trà My & Văn Đoàn ♡`
    : `Cảm ơn ${name} đã phản hồi. Chúng mình rất trân trọng lời chúc của bạn ♡`;
});
