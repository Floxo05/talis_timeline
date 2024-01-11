"use client"
import {useState} from 'react';

const HelpFlayout = () => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    const handleLinkClick = () => {
        setIsFlyoutOpen((prev) => !prev);
    };

    return (
        <div className={'mt-4 w-full'}>
            <a
                href="#"
                onClick={handleLinkClick}
                className={'text-blue-500 hover:underline cursor-pointer'}
            >
                README
            </a>

            {isFlyoutOpen && (
                <div
                    className={'flyout bg-blue-950 w-full p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md'}>
                    <h2 className="text-2xl font-bold mb-2">README</h2>
                    <p>
                        Liebe Talesia, <br/>
                        ich wünsche dir alles alles Gute zum Geburtstag 🥳!
                    </p>
                    <p>
                        20 Jahre und du hast schon so viel erreicht. Wie du durch dein Studium rennst ist selbst nach
                        der langen Zeit immer noch nicht so ganz greifbar für mich. WTF, du bist einfach vor mir fertig
                        obwohl du nach mir angefangen hast 😂.
                    </p>
                    <br/>
                    <p>
                        Diese Zeit beinhaltet auch viele Momente, die wir schon zusammen erleben konnten. Deswegen habe
                        ich nur für DICH diese Webseite erstellt! Du kannst
                        du auf dieser Seite alle unsere Erlebnisse nochmal erleben!
                    </p>
                    <p>
                        Doch so einfach mache ich es dir nicht. Du musst jetzt zeigen, was du während deines Studiums
                        gelernt hast!
                    </p>
                    <br/>
                    <p>
                        Du musst ein Passwort eingeben, um die Anwendung zu starten!
                    </p>
                    <p>
                        In dem Programm kannst du Punkte sammeln, in dem du Rätsel löst. Diese kommen aus den
                        verschiedensten Bereichen aus deinem Studium (also eig. aus meinem, aber ich hoffe, du kannst
                        alle beantworten 😂).
                    </p>
                    <br/>
                    <p>
                        Ich wünsche dir ganz viel Spaß und Nostalgiekicks beim Lösen des Programms.
                    </p>
                    <br/>
                    <p>
                        Dein Florian
                    </p>
                    <button
                        onClick={handleLinkClick}
                        className={'bg-blue-500 text-white p-2 mt-4 hover:bg-blue-700 cursor-pointer'}
                    >
                        Flyout schließen
                    </button>
                </div>
            )}
        </div>
    );
};

export default HelpFlayout;
