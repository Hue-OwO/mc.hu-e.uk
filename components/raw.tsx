import style from './style.module.css';
export default function Raw({data}: any) {

    
    const decoded:any = atob(data.properties[0].value);
    const json = {
        id: data.id,
        name: data.name,
        properties: [
            {
                name: "textures",
                value: JSON.parse(decoded) 
            }
        ],
        profileActions: data.profileActions
    }
    return (
        <div className={style.raw}>
            <div className={style.rawMargin}>
             <pre>
                <code className={style.rawJson}>
                    {JSON.stringify(json, null, 2)}
                </code>
             </pre>
            </div>
        </div>
    )
}
