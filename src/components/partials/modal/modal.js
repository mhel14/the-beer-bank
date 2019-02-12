import React from 'react';

const Modal = (props) => {
  const { beers } = props;
  const { 
    name, 
    tagline, 
    image_url, 
    ibu, 
    abv, 
    ebc, 
    description,
    food_pairing, 
    randomSuggestedProductId
  } = props.popUpContent;
  
  const suggested = food_pairing && food_pairing.map(product => (
    <li key={product}>{product}</li>
  ))

    const randomSuggestedProduct = beers && beers.filter(b => {
     return randomSuggestedProductId && randomSuggestedProductId.includes(b.id)
    });

    const suggestedProductList = randomSuggestedProduct.map(product => (
      <li key={product.id}>
        <img src={product.image_url} alt={product.name} />
        <p>{product.name}</p>
      </li>
    ));

  return (
    <div id="modal1" className="modal">
      <button className="modal-close material-icons">close</button>
      <div className="modal-content">
        <div className="modal-inner-content-wrapper">
          <img src={image_url} alt={name} />
          <div className="product-details-wrapper">
            <h4>{name}</h4>
            <p className="tagline">{tagline}</p>
            <div className="sub-divider"></div>
            <div className="percentage">
              <p><span>IBU: </span>{ibu}</p>
              <p><span>ABV: </span>{abv}%</p>
              <p><span>EBC: </span>{ebc}</p>
            </div>
            <p>{description}</p>
            <p className="served-with-heading">Best served with:</p>
            <ul className="served-with-items">{suggested}</ul>
          </div>
        </div>
        <p className="suggested-product-heading">You might also like: </p>
        <ul className="suggested-wrapper">
          {suggestedProductList}
        </ul>
      </div>
    </div>
  )
}

export default Modal;