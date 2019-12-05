import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import Octicon, {Repo, Star, RepoForked} from '@primer/octicons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import sortby from 'lodash.sortby';

const CoreInfo = (props) => {

    const { repoData } = props;
    const { repo } = collectRepoData(repoData);
    const { languangeData } = calculateLanguageData(repo)
    const { starPerLanguage } = calculateStarPerLanguage(repo)
    const { languageData } = generatePieChartLanguageData(languangeData);
    const { starPerLanguageData } = generatePieChartStarsPerLanguageData(starPerLanguage);
    const { starsPerRepo } = calculateStarPerRepository(repo, 6);
    const { starPerRepoData } = generateBarChartStarsPerRepo(starsPerRepo);
    
    const legendOpts = {
        display: true,
        position: 'right',
        fullWidth: true,
        reverse: false,
        labels: {
          fontColor: 'rgb(0, 0, 0)'
        }
    };
    
    return (
        <div> 
            <div className="container core">
                <div className="row">
                    <Card>
                        <h5 className="card-title title-center">Top Languages</h5>
                        <Pie data={ languageData } width={ 630 } height={ 630 } options={ { legend: legendOpts }}/>
                    </Card>
                    <Card>
                        <h5 className="card-title title-center">Most Starred</h5>
                        <Bar data={ starPerRepoData } width={ 630 } height={ 630 } options= { { legend: { display: false } } }/>
                    </Card>
                    <Card>
                        <h5 className="card-title title-center">Star Per Language</h5>
                        <Doughnut data={ starPerLanguageData } width={ 630 } height={ 630 } options={ { legend: legendOpts }}/>
                    </Card>
                </div>
                
                <div className="row repo-card-set">
                    <div className="col-md-4">
                        <h3>Top Repositories</h3>
                        <br></br>
                    </div>
                </div>
                <div className="row">
                    {
                            starsPerRepo.map(repo => (
                                <RepoCard key={ repo.name } url={ repo.core.htmlUrl }>
                                    <h6> <Octicon icon={Repo} size='small' verticalAlign='middle'/> { repo.name } </h6>
                                    <br></br>
                                    <p className="description">{ repo.core.description }</p>
                                    <div className="repo-footer-right">
                                        <span>
                                            <Octicon icon={Star} size='small' verticalAlign='middle'/> { repo.stargazers_count } 
                                        </span>
                                        <span className="icon-data">
                                            <Octicon icon={RepoForked} size='small' verticalAlign='middle'/> { repo.core.forks_count } 
                                        </span>
                                    </div>

                                    <div className="repo-footer-left">
                                        <LanguageIcon language={ repo.core.language } />
                                    </div>
                                    
                                </RepoCard> 
                            ))
                        }
                </div>
            </div>
            <style jsx>
            {`
                html {
                    background: #cccccc;
                }

                .my-title {
                    margin-bottom: 0.75rem;
                    text-align: center;
                }

                .repo-card-set {
                    margin-top: 3em;
                }

                .selectpicker {
                    max-width: 100px;
                }

                .repo-footer-right {
                    position:absolute;
                    bottom:0;
                    right:0;
                    padding: 10px;
                    font-size: 0.9em;
                }

                .repo-footer-left {
                    position:absolute;
                    bottom:0;
                    padding: 0px 10px 10px 0px;
                    font-size: 0.9em;
                    color: black;
                }

                .icon-data {
                    padding: 0px 10px 0px 10px;
                }
            `}
            </style>
        </div>
    )
}

const Card = (props) => {

    return (
        <div className="col-md-4 my-card"> 
            <div className="card bg-secondary mb-3">
                <div className="card-body my-chart">
                    { props.children }
                </div>
            </div>

            <style jsx>
            {`
                .my-card {
                    margin-top: 2em;
                }

                .my-chart {
                    padding: 2em;
                }

            `}
            </style>
        </div>
    )
}

const RepoCard = (props) => {
    return (
        <a href={ props.url } target="_blank"> 
            <div className="card bg-secondary mb-3 my-repo-card">
                <div className="card-body">
                    { props.children }
                </div>
            </div>

            <style jsx>
            {`
                .my-repo-card {
                    margin-top: 2em;
                    width: 20rem;
                    height: 15rem;
                    margin: 1em 2em 2em 2em;
                }

                a {
                    color: inherit;
                    text-decoration: none; /* no underline */
                  }
            `}
            </style>
        </a>
    )
}

const LanguageIcon = (props) => {
    return (
        <span className="data">
            <FontAwesomeIcon icon={faCircle} /> { props.language }
            <style jsx>
                {`
                    .data {
                        color: black;
                    }
                `}
            </style>
        </span>
    )
}

const collectRepoData = (repoData) => {
    let repo = repoData.map( repo => {
        
        return {    
                    name: repo.name, 
                    htmlUrl: repo.html_url, 
                    description: repo.description, 
                    language: repo.language, 
                    forks_count: repo.forks_count, 
                    stargazers_count: repo.stargazers_count 
        }
    });

    return { repo: repo };
}

const calculateLanguageData = (repoData) => {
    let languange_data = {};
    repoData.map( repo => {
        if(languange_data[repo.language] === undefined) {
            languange_data[repo.language] = 1;
        }
        else {
            languange_data[repo.language] += 1;
        }
    });

    return { languangeData: languange_data };
}

const calculateStarPerLanguage = (repoData) => {
    let star_per_language = {};
    repoData.map( repo => {
        if(star_per_language[repo.language] === undefined) {
            star_per_language[repo.language] = repo.stargazers_count;
        }
        else {
            star_per_language[repo.language] += repo.stargazers_count;
        }
    });
    
    return { starPerLanguage: star_per_language };
}

const calculateStarPerRepository = (repoData, limit) => {
    let starsPerRepo = [];
    const compare = (a,b) => {
        if(a.stargazers_count > b.stargazers_count)
            return 1;
        else 
            return -1;
    }

    repoData.sort(compare);
    
    const createRepoStarObject = { name: null, stargazers_count: null, core: null };

    let numberOfRepos = (limit < repoData.length) ? limit : repoData.length;

    for(let i = 0; i < numberOfRepos; i++) {
        let r = repoData.pop();
        let o = Object.create(createRepoStarObject);
        o.name = r.name;
        o.stargazers_count = r.stargazers_count;
        o.core = r;
        starsPerRepo.push(o);
    }

    return { starsPerRepo: starsPerRepo};
} 

const generatePieChartLanguageData = (languangeData) => {
    delete languangeData[null];
    let topLanguages = []
    const l = {language: null, count: null}
    Object.keys(languangeData).forEach( key => {
        let new_l = Object.create(l);
        new_l.language = key;
        new_l.count = languangeData[key];
        topLanguages.push(new_l);
    });
    topLanguages = sortby(topLanguages, "count").splice(topLanguages.length - 7 ,topLanguages.length);
    const languageNames = topLanguages.map(d => { return d.language })
    const languageCount = topLanguages.map(d => { return d.count })
    
    const data = {
        labels: languageNames,
        datasets: [{
            data: languageCount,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#60E888',
            '#6089E8',
            '#E860B2',
            '#E86068'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#60E888',
            '#6089E8',
            '#E860B2',
            '#E86068'
            ]
        }]
    };

    return { languageData: data };
}

const generatePieChartStarsPerLanguageData = (starPerLanguage) => {
    delete starPerLanguage[null];
    let topLanguages = []
    const l = {language: null, stars: null}
    Object.keys(starPerLanguage).forEach( (key,index) => {
        let new_l = Object.create(l);
        new_l.language = key;
        new_l.stars = starPerLanguage[key];
        topLanguages.push(new_l);
    });
    topLanguages = sortby(topLanguages, "stars").splice(topLanguages.length - 7 ,topLanguages.length);

    const languageNames = topLanguages.map(d => { return d.language })
    const starCount = topLanguages.map(d => { return d.stars })
    
    const data = {
        labels: languageNames,
        datasets: [{
            data: starCount,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#60E888',
            '#6089E8',
            '#E860B2',
            '#E86068'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#60E888',
            '#6089E8',
            '#E860B2',
            '#E86068'
            ]
        }]
    };

    return { starPerLanguageData: data };
}

const generateBarChartStarsPerRepo = (starsPerRepo) => {
    const starsPerRepo_5 = starsPerRepo.slice(0,5);
    const repoNames = starsPerRepo_5.map(a => { return a.name });
    const starCount = starsPerRepo_5.map(a => { return a.stargazers_count });
    const data = {
        labels: repoNames,
        datasets: [
          {
            backgroundColor: [
                'rgb(252, 71, 68, 0.2)',
                'rgb(68, 197, 252, 0.2)',
                'rgb(74, 252, 68, 0.2)',
                'rgb(240, 153, 234, 0.2)',
                'rgb(240, 230, 153, 0.2)',
                ],
            borderColor: [
                'rgb(252, 71, 68, 1)',
                'rgb(68, 197, 252, 1)',
                'rgb(74, 252, 68, 1)',
                'rgb(240, 153, 234, 1)',
                'rgb(240, 230, 153, 1)',
                ],
            borderWidth: 1,
            hoverBackgroundColor: [
                'rgb(252, 71, 68, 0.4)',
                'rgb(68, 197, 252, 0.4)',
                'rgb(74, 252, 68, 0.4)',
                'rgb(240, 153, 234, 0.4)',
                'rgb(240, 230, 153, 0.4)',
                ],
            hoverBorderColor: [
                'rgb(252, 71, 68, 1)',
                'rgb(68, 197, 252, 1)',
                'rgb(74, 252, 68, 1)',
                'rgb(240, 153, 234, 1)',
                'rgb(240, 230, 153, 1)',
                ],
            data: starCount
          }
        ]
      };

      return { starPerRepoData: data };
}

export default CoreInfo;