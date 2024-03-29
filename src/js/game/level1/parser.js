const errorVariations = [
    [
        'Código inválido:',
        'linha:'
    ],
    [
        'Invalid code:',
        'line:'
    ]
]

let langSelector = window.location.href.includes('english') ? 1 : 0;

const functionFilter = [
    {
        filter: new RegExp('^andarFrente(\\s+)?\\((\\s+)?(0|[1-9][0-9]*)(\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^andarTras(\\s+)?\\((\\s+)?(0|[1-9][0-9]*)(\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^girarEsquerda(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^girarDireita(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^darMeiaVolta(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'sequential'
    },
    {
        filter: new RegExp('^coletarCristal(\\s+)?\\((\\s+)?\\)(\\s+)?(;)?$'),
        type: 'normal'
    }
]

function printError(text,line)
{
    const consoleElement = document.getElementById('consoleArea');
    consoleElement.innerText += `${errorVariations[langSelector][0]} ${text} ${errorVariations[langSelector][1]} ${line}\n`;
}

export default function parseCode(code)
{
    let codeParsed = "const delay = (milisecs) => {return new Promise((resolve) => setTimeout(resolve,milisecs));}\nasync function runCode(){\n";
    const lines = code.split('\n');
    let valid = true;
    for(let i = 0;i < lines.length;i++)
    {
        let validLine = false;
        let lineType;
        if(lines[i].trim() != "")
        {
            for(let j = 0;j < functionFilter.length;j++)
            {
                validLine = functionFilter[j].filter.test(lines[i].trim());
                if(validLine)
                {
                    lineType = functionFilter[j].type;
                    break;
                }
            }
            if(validLine)
            {
                if(lineType === "sequential")
                {
                    let lineParsed = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});\n`
                    lineParsed += "await " + lines[i].trim() + "\n";
                    codeParsed += lineParsed;
                }
                else
                {
                    let lineParsed = `editor.focus();
                    editor.dispatch({selection:{anchor:editor.state.doc.line(${i+1}).from}});
                    await delay(250);\n`
                    lineParsed += lines[i].trim() + "\n";
                    codeParsed += lineParsed;
                }
            }
            else
            {
                printError(lines[i],i+1);
                valid = false;
                break;
            }
        }
        else
        {
            continue;
        }
    }

    if(valid)
    {
        codeParsed += "}\nrunCode()";
        return codeParsed;
    }
    else
    {
        return null;
    }
}