import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from 'react-i18next';

class SidebarContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.initMenu();
        }
    }

    initMenu() {
            new MetisMenu("#side-menu");

            var matchingMenuItem = null;
            var ul = document.getElementById("side-menu");
            var items = ul.getElementsByTagName("a");
            for (var i = 0; i < items.length; ++i) {
                if (this.props.location.pathname === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }
            if (matchingMenuItem) {
                this.activateParentDropdown(matchingMenuItem);
            }
    }

    activateParentDropdown = item => {
        item.classList.add("active");
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add("mm-active");
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add("mm-show");

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add("mm-active"); // li
                    parent3.childNodes[0].classList.add("mm-active"); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add("mm-active");
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                 <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                     <li>
                         <Link to="/Dictionary">
                                    <img  src={require('../../assets/images/icons/alfabet.svg')} alt=''/>
                                    <span style={{'paddingLeft':'20px'}}>{this.props.t('Lüğət') }</span>
                                </Link>
                     </li>
                     <li>
                     <Link to='/AddWord'>
                     <img  src={require('../../assets/images/icons/wordbook.svg')} alt=''/>
                     <span style={{'paddingLeft':'20px'}}>{this.props.t('Söz əlavə et') }</span>
                     </Link>
                   </li>
                     <li>
                       <Link to='/#'>
                       <img  src={require('../../assets/images/icons/tasks.svg')} alt=''/>
                       <span style={{'paddingLeft':'20px'}}>{this.props.t('Tapşırıqlar') }</span>
                       </Link>
                     </li>
                     <li>
                     <Link to='/#' className="has-arrow waves-effect">
                     <img  src={require('../../assets/images/icons/references.svg')} alt=''/>
                     <span style={{'paddingLeft':'20px'}}>{this.props.t('İstinadlar') }</span>
                     </Link>
                         <ul className="sub-menu" aria-expanded="false">
                             <li><Link to="/CreateReferance">{this.props.t('İstinad əlavə et') }</Link></li>
                             <li><Link to="/References">{this.props.t('Bütün istinadlar') }</Link></li>
                         </ul>
                   </li>
                   <li>
                   <Link to='/#'>
                   <img  src={require('../../assets/images/icons/income.svg')} alt=''/>
                   <span style={{'paddingLeft':'20px'}}>{this.props.t('Gəlirlər') }</span>
                   </Link>
                 </li>
                 <li>
                 <Link to='/#'>
                 <img src={require('../../assets/images/icons/statistic.svg')} alt=''/>
                 <span style={{'paddingLeft':'20px'}}>{this.props.t('Statistika') }</span>
                 </Link>
               </li>
             <li>
             <Link to='/#' className="has-arrow waves-effect">
             <img src={require('../../assets/images/icons/group.svg')} alt=''/>
             <span style={{'paddingLeft':'20px'}}>{this.props.t('Komanda') }</span>
             </Link>
                <ul className="sub-menu" aria-expanded="false">
                    <li><Link className='ml-3' to="/UserList">{this.props.t('Bütün istifadəçilər') }</Link></li>
                    <li><Link className='ml-3' to="/CreateUser">{this.props.t('İstifadəçi əlavə et') }</Link></li>
                </ul>
             </li>
                {/*    ============================ word profile ======================*/}
                    <li>
                        <Link to='/WordProfile'>
                            <img src={require('../../assets/images/icons/statistic.svg')} alt=''/>
                            <span style={{'paddingLeft':'20px'}}>{this.props.t('word profile') }</span>
                        </Link>
                    </li>
                {/*    =====================================  categories  ==================================*/}


                         <li>
                     <Link to='/#' className="has-arrow waves-effect">
                     <img  src={require('../../assets/images/icons/references.svg')} alt=''/>
                     <span style={{'paddingLeft':'20px'}}>{this.props.t('Kateqoriyalar') }</span>
                     </Link>
                         <ul className="sub-menu" aria-expanded="false">
                             <li><Link to="/Categories">{this.props.t('Kateqoriya əlavə et') }</Link></li>
                             <li><Link to="/CategoriesList">{this.props.t('Bütün Kateqoriyalar') }</Link></li>
                         </ul>
                   </li>
                </ul>
            </div>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(SidebarContent));
